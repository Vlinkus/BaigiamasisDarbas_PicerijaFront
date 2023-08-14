import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useLogout from "../hooks/useLogout";
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();
    const logout = useLogout();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            console.log('verifying refresh token')
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        const signOut = async () => {
            try {
                await logout();
            } catch (err) {
                console.error(err);
            }
        }

        // console.log(`auth.at = ${!auth?.accessToken}`)
        !persist && signOut();
        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin