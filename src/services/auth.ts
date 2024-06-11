import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { auth, db } from "./firebase";
import { upload } from "./upload";
import { doc, setDoc } from "firebase/firestore";

export function Auth() {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
      });
      const [error, setError] = useState(false);
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
    
          if (password !== confirm_password) {
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
          setIsLoading(false);

          await signInWithEmailAndPassword(auth, email, password);
    
          router.push('/dashboard');
        } catch (error) {
          console.log('tivemos um erro', error);
        }finally {
          setIsLoading(false);
      }
      }

      return {
        error,
        avatar,
        handleAvatar,
        createUser,
        isLoading,
        handleLogin
      }
}