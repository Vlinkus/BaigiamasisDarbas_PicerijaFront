import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/v1/auth/refresh-token', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.role);
            console.log(response.data.access_token);
            return { ...prev, 
                role: response.data.role,
                accessToken: response.data.access_token }
        });
        return response.data.access_token;
    }
    return refresh;
};

export default useRefreshToken;