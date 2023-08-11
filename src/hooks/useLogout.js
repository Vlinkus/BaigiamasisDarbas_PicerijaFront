import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useLogout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    if (isLoggedOut) {
      // Perform the logout operation using Axios
      axios.post("/api/v1/auth/logout")
        .then(() => {
          // Do any necessary cleanup or state management
          // For example, clear user data from local storage, etc.
          // You might want to redirect the user after successful logout
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          // Handle error if necessary
        });
    }
  }, [isLoggedOut]);

  const logout = () => {
    setIsLoggedOut(true);
  };

  return logout;
};

export default useLogout