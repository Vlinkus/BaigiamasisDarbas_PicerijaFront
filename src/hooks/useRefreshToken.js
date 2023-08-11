import axios from '../api/axios';
import useAuth from './useAuth';

export default function useRefreshToken() {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.post('/refresh-token',{
                headers: {'Authorization': 'Bearer ' + auth.refresh},
                withCredentials: true
            })

            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.access_token);
                return { ...prev, accessToken: response.data.accessToken, refresh: response.data.refresh }
            })
            return response.data.access_token;
        } catch (error) {
            console.log("Error refreshing token:", error);
        }
    };
    
    return refresh;
}