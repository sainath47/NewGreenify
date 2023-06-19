import { useState } from "react";
import { useAuthContext } from "./useAuthContext";



export const useRegister = () => {
  const {dispatch} =  useAuthContext()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const register = async (firstName, lastName, email, mobileNo, password ) => {
    // console.log(firstName, lastName, email, password, mobileNo, "user register");
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({firstName, lastName, email, password,mobileNo }),
    });
    const json = await response.json();

    if (!response.ok) {
   
      alert(json.error)
      setIsLoading(false);
      setError(json.error);

    } else if (response.ok) {
      alert('successfully signedUp')
      //save the toke to local storage \store in the local storage , eventhough you are gonna refresh the page the state is gonna reset but the localstorage will be having the credentials we are gonna set
      localStorage.setItem("user", JSON.stringify(json));
      //update the authcontext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { register, isLoading, error };
};
