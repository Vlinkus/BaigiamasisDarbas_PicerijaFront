import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            }, error => Promise.reject(error)
        );

        const responceInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error?.config;
                
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();

                    if (isMounted) {
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(responceInterceptor)
            axiosPrivate.interceptors.response.eject(responceInterceptor)
        }
    },[auth,refresh])

    return axiosPrivate;
}
export default useAxiosPrivate;