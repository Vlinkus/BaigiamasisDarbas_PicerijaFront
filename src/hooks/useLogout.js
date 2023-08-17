import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    try {
      const response = await axios.get("/api/v1/auth/logout", {
        headers: auth?.accessToken
          ? { Authorization: `Bearer ${auth.accessToken}` }
          : null,
        withCredentials: true
      });
      setAuth({});
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
