import axios from '../api/axios';
import useAuth from './useAuth';

export default function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.post('/refresh-token', null,{
                withCredentials: true
            })

            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return { ...prev, accessToken: response.data.accessToken }
            })
            return response.data.accessToken;
        } catch (error) {
            console.log("Error refreshing token:", error);
        }
    };
    
    return refresh;
}