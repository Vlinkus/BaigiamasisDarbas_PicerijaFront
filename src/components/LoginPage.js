import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import Loader from "./loader/Loader";
import axios from '../api/axios';

const LOGIN_URL = '/api/v1/auth/login';

export default function LoginPage() {
    const { t } = useTranslation();
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    //const navigate = useNavigate()
    const [submitHandle, setSubmitHandle] = useState(false);

    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);

    const [pwd,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');

    useEffect(() => {
        // if(success === false)
        userRef.current.focus();
        setSubmitHandle(false);
    },[])

    useEffect(() => {
        setValidName(user.length > 0);
    }, [user])

    useEffect(() => {
        setValidPwd(pwd.length > 0);
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    },[user,pwd])

    const handleSubmit = async (e) => {
        setSubmitHandle(true);
        e.preventDefault();
        //console.log(user, pwd);
        try{
            const response = await axios.post(LOGIN_URL,
                {username: user, password: pwd},
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            //console.log("hmmm... ok?")
            const accessToken = response.data.access_token;
            const refresh = response.data.refresh_token;
            const role = response.data.role;
            const key = response.data.key; // password
            setAuth({user, key, role, accessToken, refresh});
            setUser('')
            setPwd('')
            navigate(from, { replace: true });
        } catch (err) {
            if(!err?.response) {
                setErrMsg( t("NoServerResponse") )
            } if (err?.response?.status === 403) {
                setErrMsg( t("WrongCredentials"))
            } else if (err?.response?.status === 500) {
                setErrMsg( t("InternalError") )
            } else {
                setErrMsg( t("LoginFailed") )
            }
            errRef.current.focus();
        } finally {
            setSubmitHandle(false);
        }
    }

    return (
    <section style={{maxWidth:"24em"}}>
        <div  ref={errRef} 
            className="p_error_box"
            style={{ display: errMsg ? "" : "none"}} 
            aria-live="assertive"
        >{errMsg}</div>

        <form onSubmit={handleSubmit}>
            <label>{t("Username")} *</label>
            <input 
                type="text"
                name="username" 
                value={user} 
                onChange={(e) => setUser(e.target.value)}
                placeholder={t("Username")} 
                ref={userRef} 
                autoComplete="off" 
                className="p_input-field" 
                required
            />

            <label>{t("Password")} *</label>
            <input 
                type="password"
                name="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder={t("Password")}
                className="p_input-field" 
                required
            />

            <input 
                type="checkbox" 
                id="cb" 
                value="Prisiminti mane"/>
            <label htmlFor="cb">{t("RememberMe")}</label>

            <button
                // value="Prisijungti" 
                className="p_button"
                disabled={ !validName || !validPwd || submitHandle ? true : false}
            >{t("Login")}</button>
            <br/>
        </form> 
        <Link to="#">{t("ForgotPassword")}?</Link><br/>
        <div style={{ display: submitHandle ? "" : "none" }}>
            <Loader/>
        </div>
    </section>)
}