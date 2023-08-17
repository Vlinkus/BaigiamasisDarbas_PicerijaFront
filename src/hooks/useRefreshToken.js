import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

<<<<<<< HEAD
    const refresh = async () => {
        const response = await axios.get('/api/v1/auth/refresh-token', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, 
                role: response.data.role,
                accessToken: response.data.access_token }
        });
        return response.data.access_token;
    }
    return refresh;
=======
  const refresh = async () => {
    const response = await axios.get("/api/v1/auth/refresh-token", {
      withCredentials: true
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.role);
      console.log(response.data.access_token);
      return {
        ...prev,
        role: response.data.role,
        accessToken: response.data.access_token
      };
    });
    return response.data.access_token;
  };
  return refresh;
>>>>>>> main
};

export default useRefreshToken;
