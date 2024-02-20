//import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Loader from "./loader/Loader";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{7,31}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "/api/v1/auth/register";

export default function RegisterPage() {
  const { t } = useTranslation();

  const userRef = useRef();
  const errRef = useRef();

  const [submitHandle, setSubmitHandle] = useState(false);
  // Username
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  // Firstname
  const [firstname, setFirstname] = useState("");
  const [validFirstname, setValidFirstname] = useState(false);
  const [firstnameFocus, setFirstnameFocus] = useState(false);
  // Lastname
  const [lastname, setLastname] = useState("");
  const [validLastname, setValidLastname] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);
  // Email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  // Password
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  // Confirm Password
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [agreement, setAgreement] = useState(false);

  useEffect(() => {
    userRef.current.focus();
    setSubmitHandle(false);
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidFirstname(firstname.length > 2);
  }, [firstname]);

  useEffect(() => {
    setValidLastname(lastname.length > 2);
  }, [lastname]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, firstname, lastname, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitHandle(true);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = firstname.length > 2;
    const v4 = lastname.length > 2;
    const v5 = EMAIL_REGEX.test(email);
    const v6 = agreement;
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg(t("InvalidEntry"));
      setSubmitHandle(false);
      return;
    } else if (!v6) {
      setErrMsg(t("MustAgree"));
      setSubmitHandle(false);
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        {
          firstname: firstname,
          lastname: lastname,
          username: user,
          email: email,
          password: pwd
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      // console.log(response?.data);
      // console.log(response.data.access_token);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUser("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg(t("NoServerResponse"));
      } else if (
        err.response.status === 406 &&
        Array.isArray(err.response.data.errors)
      ) {
        setErrMsg(err.response.data.errors);
      } else if (err.response.status === 406) {
        setErrMsg(err.response.data.errors);
      } else if (err.response.status === 400) {
        setErrMsg(err.response.data.error);
      } else {
        setErrMsg(t("RegistrationFailed"));
      }
      errRef.current.focus();
    } finally {
      setSubmitHandle(false);
    }
  };

  const handleAgreementDecision = () => {
    setAgreement((prevAgreement) => !prevAgreement);
  };

  return (
    <section style={{ maxWidth: "24em" }}>
      {success ? (
        <div>
          <h2>{t("RegistrationSuccessful")}</h2>
          <p>{t("NowCanLogin")}</p>
        </div>
      ) : (
        <>
          <h2>{t("Registration")}</h2>
          <div
            ref={errRef}
            className="p_error_box"
            style={{ display: errMsg ? "" : "none" }}
            aria-live="assertive"
          >
            {errMsg}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username input section */}
            <label htmlFor="username">
              {t("Username")}:
              <span style={{ display: validName || !user ? "none" : "" }}>
                ❌
              </span>
              <span style={{ display: validName ? "" : "none" }}>✅</span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              // css style
              className="p_input-field"
              onFocus={() => setUserFocus(true)}
              // when you leave focus
              onBlur={() => setUserFocus(false)}
            />
            <span
              id="uidnote"
              style={{
                display: userFocus && user && !validName ? "block" : "none"
              }}
            >
              ❗8 to 32 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </span>

            {/* Firstname input section */}
            <label htmlFor="name">
              {t("FirstName")}:
              <span
                style={{ display: validFirstname || !firstname ? "none" : "" }}
              >
                ❌
              </span>
              <span style={{ display: validFirstname ? "" : "none" }}>✅</span>
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              required
              aria-invalid={validFirstname ? "false" : "true"}
              aria-describedby="fnidnote"
              className="p_input-field"
              onFocus={() => setFirstnameFocus(true)}
              onBlur={() => setFirstnameFocus(false)}
            />
            <span
              id="fnidnote"
              style={{
                display:
                  firstname && !validFirstname && firstnameFocus ? "" : "none"
              }}
            >
              ❗Please enter your name
              <br />
            </span>

            {/* Lastname input section */}
            <label htmlFor="lastname">
              {t("LastName")}:
              <span
                style={{ display: validLastname || !lastname ? "none" : "" }}
              >
                ❌
              </span>
              <span style={{ display: validLastname ? "" : "none" }}>✅</span>
            </label>
            <input
              type="text"
              id="lastname"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              required
              aria-invalid={validLastname ? "false" : "true"}
              aria-describedby="lnidnote"
              className="p_input-field"
              onFocus={() => setLastnameFocus(true)}
              onBlur={() => setLastnameFocus(false)}
            />
            <span
              id="lnidnote"
              style={{
                display:
                  lastname && !validLastname && lastnameFocus ? "" : "none"
              }}
            >
              ❗Please enter your last name
              <br />
            </span>

            <label htmlFor="email">
              {t("Email")}:
              <span style={{ display: validEmail || !email ? "none" : "" }}>
                ❌
              </span>
              <span style={{ display: validEmail ? "" : "none" }}>✅</span>
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              className="p_input-field"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <span
              id="emailnote"
              style={{
                display: emailFocus && email && !validEmail ? "block" : "none"
              }}
            >
              ❗Please enter a propper email
            </span>

            {/* Password input section */}

            <label htmlFor="password">
              {t("Password")}:
              <span style={{ display: validPwd || !pwd ? "none" : "" }}>
                ❌
              </span>
              <span style={{ display: validPwd ? "" : "none" }}>✅</span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-describedby="pwdnote"
              className="p_input-field"
              aria-invalid={validPwd ? "false" : "true"}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <span
              id="pwdnote"
              style={{ display: pwdFocus && !validPwd ? "" : "none" }}
            >
              ❗ 8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </span>

            <label htmlFor="confirm_pwd">
              {t("ConfirmPassword")}:
              <span style={{ display: validMatch || !matchPwd ? "none" : "" }}>
                ❌
              </span>
              <span style={{ display: validMatch && matchPwd ? "" : "none" }}>
                ✅
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className="p_input-field"
            />
            <span
              id="confirmnote"
              style={{ display: matchFocus && !validMatch ? "" : "none" }}
            >
              ❗ Must match the first password input field.
              <br />
            </span>

            <input
              id="agr"
              type="checkbox"
              checked={agreement}
              onChange={handleAgreementDecision}
            />
            <label style={{ fontSize: "0.85em" }} htmlFor="agr">
              {t("agreement")}
            </label>

            <button
              id="sub_button"
              className="p_button"
              disabled={
                !validName ||
                !validFirstname ||
                !validLastname ||
                !validEmail ||
                !validPwd ||
                !validMatch ||
                !agreement ||
                submitHandle
                  ? true
                  : false
              }
            >
              {t("Register")}
            </button>
            <div style={{ display: submitHandle ? "" : "none" }}>
              <Loader />
            </div>
          </form>
        </>
      )}
    </section>
  );
}
