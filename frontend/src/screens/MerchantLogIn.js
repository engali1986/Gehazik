import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "../Context/LanguageContext.js"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const MerchantLogIn = ({ globalState, setGlobal }) => {
  const {Language,SetLanguage}=useContext(LanguageContext)
  const navigate = useNavigate();
  const Email = useRef();
  const Password = useRef();
  const Alert = useRef();
  const varificationCodeRef = useRef();
  const LoginButtonRef = useRef();
  const [Credentials, setCredentials] = useState({
    Email: "",
    Password: "",
  });
  const [Disabled, setDisabled] = useState(false);
  const EmailInput = (x) => {
    Alert.current.style.maxHeight = "0px";
    setCredentials({ ...Credentials, Email: x.target.value });
  };
  const VarifyEmail = async (e) => {
    e.stopPropagation()
    console.log(Credentials);
    console.log(typeof Credentials.VarificationCode);
    const Merchantvarified = await fetch(
      "http://localhost:5000/LogInMerchant",
      {
        method: "POST",
        body: JSON.stringify(Credentials),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        return "user Not Added";
      });
    console.log(Merchantvarified);
    if (
      Merchantvarified.resp.Email &&
      Merchantvarified.resp.MerchantVarified === true
    ) {
      setGlobal(
        Merchantvarified.resp.Name,
        true,
        Merchantvarified.resp.Email,
        false,
        false,
        true, Merchantvarified.resp.Token, Merchantvarified.resp.Governorate, Merchantvarified.resp.City
      );
      Alert.current.classList.replace("alert-danger", "alert-success");
      Alert.current.innerText = Language==="ar"?"تم تسجيل الدخول بنجاح ":"User Logged in successfully";
      Alert.current.style.maxHeight = "500px";
    } else if (
      Merchantvarified.resp.Email &&
      Merchantvarified.resp.MerchantVarified === false
    ) {
      Alert.current.classList.replace("alert-danger", "alert-success");
      Alert.current.innerText =Language==="ar"?"تم ارسال رمز التحقق عبر البريد الالكتروني ":"Varification Code sent by Email";
      Alert.current.style.maxHeight = "500px";
      varificationCodeRef.current.style.display = "flex";
      setDisabled(false);
    } else {
      Alert.current.classList.replace("alert-success", "alert-danger");
      Alert.current.innerText =Language==="ar"?"لم يتم العثور على التاجر":"User not found";
      Alert.current.style.maxHeight = "500px";
      setDisabled(false);
    }
  };
  const PasswordInput = (x) => {
    Alert.current.style.maxHeight = "0px";
    setCredentials({ ...Credentials, Password: x.target.value });
  };
  const LogInSubmit = async (e) => {
    e.stopPropagation()
    console.log("Log in");
    console.log(Credentials);
    Alert.current.style.maxHeight = "0px";
    if (Credentials.Email.length > 0 && Credentials.Password.length > 0) {
      setDisabled(true);
      LoginButtonRef.current.innerText =Language==="ar"?"جاري تسجيل الدخول ": "Loggin please wait";
      console.log("Submitted");
      const UserLogIn = await fetch(
        "http://localhost:5000/LogInMerchant",
        {
          method: "POST",
          body: JSON.stringify(Credentials),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          console.log(err);
          return "user Not Added";
        });
      console.log(UserLogIn);
      if (UserLogIn.resp) {
        console.log(UserLogIn.resp);
        LoginButtonRef.current.innerText = Language==="ar"?"تسجيل ":"Login";
        if (typeof UserLogIn.resp === "object") {
          console.log(UserLogIn.resp);
          if (
            UserLogIn.resp.Email &&
            UserLogIn.resp.MerchantVarified === true
          ) {
            console.log(UserLogIn);
            setGlobal(
              UserLogIn.resp.Name,
              true,
              UserLogIn.resp.Email,
              false,
              false,
              true,
              UserLogIn.resp.Token,
              UserLogIn.resp.Governorate, UserLogIn.resp.City
            );
            Alert.current.classList.replace("alert-danger", "alert-success");
            Alert.current.innerText = Language==="ar"?"تم تسجيل الدخول بنجاح ":"User Logged in successfully";
            Alert.current.style.maxHeight = "500px";
          } else if (
            UserLogIn.resp.Email &&
            UserLogIn.resp.MerchantVarified === false
          ) {
            console.log(UserLogIn);
            Alert.current.classList.replace("alert-danger", "alert-success");
            Alert.current.innerText =Language==="ar"?"تم ارسال رمز التحقق عبر البريد الالكتروني ":"Varification Code sent by Email";
            Alert.current.style.maxHeight = "500px";
            varificationCodeRef.current.style.display = "flex";
            setDisabled(false);
          } else {
            console.log(UserLogIn);
            Alert.current.classList.replace("alert-success", "alert-danger");
            Alert.current.innerText =Language==="ar"?"لم يتم العثور على التاجر":"User not found";
            Alert.current.style.maxHeight = "500px";
            setDisabled(false);
          }
        } else if (UserLogIn.resp === "Connection error") {
          Alert.current.classList.replace("alert-success", "alert-danger");
          Alert.current.innerText =Language==="ar"?"خطا بالاتصال ":"Connection error";
          Alert.current.style.maxHeight = "500px";
          setDisabled(false);
        } else if (UserLogIn.resp === "Varification Code sent by Email") {
          Alert.current.classList.replace("alert-success", "alert-danger");
          Alert.current.innerText =Language==="ar"?"تم ارسال رمز التحقق عبر البريد الالكتروني ":"Varification Code sent by Email";
          Alert.current.style.maxHeight = "500px";
          varificationCodeRef.current.style.display = "flex";
        } else if (UserLogIn.resp === "User varified") {
          setGlobal(
            UserLogIn.resp.Name,
            true,
            UserLogIn.resp.Email,
            false,
            false,
            true, UserLogIn.resp.Token, UserLogIn.resp.Governorate, UserLogIn.resp.City
          );
          Alert.current.classList.replace("alert-danger", "alert-success");
          Alert.current.innerText = Language==="ar"?"تم تسجيل الدخول بنجاح ":"User Logged in successfully";
          Alert.current.style.maxHeight = "500px";
          setDisabled(false);
        } else {
          console.log(UserLogIn);
          Alert.current.classList.replace("alert-success", "alert-danger");
          Alert.current.innerText =Language==="ar"?"لم يتم العثور على التاجر":"User not found";
          Alert.current.style.maxHeight = "500px";
          setDisabled(false);
        }
      } else {
        Alert.current.classList.replace("alert-success", "alert-danger");
        Alert.current.innerText =Language==="ar"?"لم يتم العثور على التاجر":"User not found";
        Alert.current.style.maxHeight = "500px";
      }
    } else {
      setDisabled(false);
      Alert.current.classList.replace("alert-success", "alert-danger");
      Alert.current.innerText =Language==="ar"?"برجاء ادخال البريد الالكتروني وكلمه المرور":"Enter Email/Password";
      Alert.current.style.maxHeight = "500px";
    }
  };
  useEffect(() => {
    if (globalState.UserLogged === true) {
      if (globalState.Admin === true) {
        navigate("/Admins/" + globalState.Name);
      } else if (globalState.Client === true) {
        navigate("/");
      } else if (globalState.Merchant === true) {
        navigate("/Merchants/" + globalState.Name);
      }
    } else {
    }
  });
  return (
    <div
      className="container1"
      onClick={() => {
        console.log(globalState);
        console.log(Credentials);
      }}
    >
      <Row>
        <h3>{Language==="ar"?"تسجيل دخول التاجر":"Merchant LogIn"}</h3>
      </Row>
      <label htmlFor="Email">
        <b>{Language==="ar"?"البريد الالكتروني":"Email"}</b>
      </label>
      <input
        type="text"
        placeholder="Enter Email"
        name="Email"
        onChange={(e) => EmailInput(e)}
        required
        disabled={Disabled}
      />
      <label htmlFor="psw">
        <b>{Language==="ar"?"كلمة المرور":"Password"}</b>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="psw"
        onChange={(e) => PasswordInput(e)}
        required
        disabled={Disabled}
      />
      <div
        ref={Alert}
        className=" alert alert-danger text-start"
        style={{
          boxSizing: "border-box",
          marginBottom: "0",
          overflow: "hidden",
          padding: "0px",
          border: "0px",
          maxHeight: "0px",
          transition: "all 0.3s ease-in-out",
        }}
        role="alert"
      ></div>
      <button
        ref={LoginButtonRef}
        className="LogInButton"
        disabled={Disabled}
        onClick={(e) => LogInSubmit(e)}
      >
        {Language==="ar"?"تسجيل":"Login"}
      </button>
      <Row ref={varificationCodeRef} style={{ display: "none" }}>
        <Col xs={12} md={8}>
          <input
            type="number"
            style={{ overflow: "hidden", width: "100%", height: "50px" }}
            placeholder="Enter varification code"
            onChange={(e) => {
              setCredentials({
                ...Credentials,
                VarificationCode: Number(e.target.value),
              });
            }}
          />
        </Col>
        <Col xs={12} md={4}>
          <button
            className="SignUpButton"
            style={{ height: "50px", margin: "0", width: "100%" }}
            onClick={(e) => VarifyEmail(e)}
          >
            Varify
          </button>
        </Col>
      </Row>
      <div style={{ textAlign: "start" }}>
        <span>
          {Language==="ar"?"لا يوجد حساب ":"Don't have account"}{" "}
          <span
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/MerchantSignUp");
            }}
          >
            {Language==="ar"?"تسجيل جديد ":"SignUp"}
          </span>
        </span>
      </div>
      <div style={{ textAlign: "start" }}>
        <span>
          {" "}
          {Language==="ar"?"نسيت كلمه المرور ":"Forgot password"}{" "}
          <span
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/MerchantPasswordRecovery");
            }}
          >
            {Language==="ar"?"اضغط هنا ":"Click here"}
          </span>
        </span>
      </div>
    </div>
  );
};
export default MerchantLogIn;
