import { useEffect, useState } from "react";

export function LoadingLogic() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadingTime = 2000;
  
      const timer = setTimeout(() => {
        setLoading(false);
      }, loadingTime);
  
      return () => clearTimeout(timer);
    }, []);

    return {
        loading
    }
}