import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './auth/AuthProvider';
import axios from '../api/axios';
const LOGIN_URL = '/api/v1/auth/login';


export default function LoginPage() {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        // if(success === false)
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    },[user,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user, pwd);
        let response;
        try{
            response = await axios.post(LOGIN_URL,
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
                setErrMsg('No Server Response')
            } if (err.response?.status === 403) {
                setErrMsg('Wrong username or password')
            } else if (err.response?.status === 500) {
                setErrMsg('Internal server error')
            } else {
                setErrMsg('Login failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>  {success ? (
                <section>
                    <h1>You are logged in</h1>
                    <br/>
                    <a href="/">Go to home</a>
                </section>
            ) : (
                <div style={{maxWidth:"24em"}}>
                    <p 
                        ref={errRef} 
                        className={errMsg?"errmsg":"offscreen"} 
                        aria-live="assertive"
                    >{errMsg}</p>

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
                        >Prisijungti</button><br/>
                    </form> 
                    <Link to="#">Pamiršai slaptažodį?</Link><br/>
                </div> 
            )}
        </>
    )
}