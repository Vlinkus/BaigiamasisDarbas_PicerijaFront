import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Loader from "./loader/Loader";
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
const LOGIN_URL = '/api/v1/auth/login';


export default function LoginPage() {
    const {setAuth} = useContext(AuthContext);

    //const navigate = useNavigate()
    const [submitHandle, setSubmitHandle] = useState(false);

    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);

    const [pwd,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false);

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
        e.preventDefault();
        setSubmitHandle(true);
        // console.log(user, pwd);
        try{
            const response = await axios.post(LOGIN_URL,
                {username: user, password: pwd},
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            const at = String(response.data.access_token);
            const rt = String(response.data.refresh_token);
            setAuth({user, pwd, at, rt});
            setUser('')
            setPwd('')
            setSuccess(true)
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No server response, try later')
            } if (err.response.status === 403) {
                setErrMsg('Wrong username or password')
            } else if (err.response.status === 500) {
                setErrMsg('Internal server error')
            } else {
                setErrMsg('Login failed')
            }
            errRef.current.focus();
        } finally {
            setSubmitHandle(false);
        }
    }

    return (
    <section style={{maxWidth:"24em"}}>
        {success ? (
            <section>
                <h1>You are logged in</h1>
                <a href="/">Go to the main page?</a>
            </section>
        ) : (
            <>
                <div  ref={errRef} 
                    className="p_error_box"
                    style={{ display: errMsg ? "" : "none"}} 
                    aria-live="assertive"
                >{errMsg}</div>

                <form onSubmit={handleSubmit}>
                    <label>Vartotojo vardas *</label>
                    <input 
                        type="username" 
                        value={user} 
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="El. paštas" 
                        ref={userRef} 
                        autoComplete="off" 
                        className="p_input-field" 
                        required
                    />

                    <label>Slaptažodis *</label>
                    <input 
                        type="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        placeholder="Slaptažodis" 
                        className="p_input-field" 
                        required
                    />

                    <input 
                        type="checkbox" 
                        id="cb" 
                        value="Prisiminti mane"/>
                    <label htmlFor="cb">Prisiminti mane</label><br/>

                    <button
                        value="Prisijungti" 
                        className="p_button"
                        disabled={ !validName || !validPwd || submitHandle ? true : false}
                    >Prisijungti</button>
                    <br/>
                </form> 
                <Link to="#">Pamiršai slaptažodį?</Link><br/>
                <div style={{ display: submitHandle ? "" : "none" }}>
                    <Loader/>
                </div>
            </>
        )}
    </section>)
}