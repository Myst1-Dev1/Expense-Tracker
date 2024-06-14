import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { auth, db } from "./firebase";
import { upload } from "./upload";
import { doc, setDoc } from "firebase/firestore";
import { setCookie } from 'nookies';

export function Auth() {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
      });
      const [error, setError] = useState(false);
      const [errorMessage, setErrorMessage] = useState('');
      const [isLoading, setIsLoading] = useState(false);
    
      const router = useRouter();

      function handleAvatar(e: FormEvent | any) {
        if (e.target.files[0]) {
          setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
          });
        }
      }
    
      async function createUser(e: FormEvent | any) {
        e.preventDefault();
    
        try {
          const formData = new FormData(e.target);
          const formEntries = Object.fromEntries(formData.entries());
          const { nome, email, password, confirm_password } = formEntries as { [key: string]: string };
    
          if(password.length < 6) {
            setErrorMessage('A senha deve ter no minímo 6 digitos');
            return setError(true);
          }

          if (password !== confirm_password) {
            setErrorMessage('As senhas não coincidem')
            return setError(true);
          }
    
          setIsLoading(true);

          const res = await createUserWithEmailAndPassword(auth, email, password);
    
          const imgUrl = await upload(avatar.file);
    
          await setDoc(doc(db, 'users', res.user.uid), {
            nome,
            email,
            password,
            avatar: imgUrl,
            expenses: [],
            incomes: []
          });
    
          router.push('/');
        } catch (error) {
          console.log('tivemos um erro', error);
        }
        finally {
            setIsLoading(false);
        }
      }

      async function handleLogin(e:FormEvent | any) {
        e.preventDefault();
    
        try {
          const formData = new FormData(e.target);
    
          const formEntries = Object.fromEntries(formData.entries());
          const {email, password } = formEntries as { [key: string]: string };
          setIsLoading(true);

          const res = await signInWithEmailAndPassword(auth, email, password);
          setCookie(undefined, 'userUid', res.user.uid);

          router.push('/dashboard');
        } catch (error) {
          console.log('tivemos um erro', error);
          setError(true);
        }finally {
          setIsLoading(false);
      }
      }

      return {
        error,
        errorMessage,
        avatar,
        handleAvatar,
        createUser,
        isLoading,
        handleLogin
      }
}