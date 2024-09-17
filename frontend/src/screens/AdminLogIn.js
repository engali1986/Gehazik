import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const AdminLogIn = ({ globalState, setGlobal }) => {
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
  const VarifyEmail = async () => {
    console.log(Credentials);
    console.log(typeof Credentials.VarificationCode);
    const UserVarified = await fetch(
      "http://localhost:5000/AdminLogIn",
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
        return "user Not Added";
      });
    if (UserVarified.resp.email && UserVarified.resp.uservarified === true) {
      setGlobal(
        UserVarified.resp.name,
        true,
        UserVarified.resp.email,
        true,
        false,
        false,
        UserVarified.resp.token
      );
      Alert.current.classList.replace("alert-danger", "alert-success");
      Alert.current.innerText = "User Logged in successfully";
      Alert.current.style.maxHeight = "500px";
    } else if (
      UserVarified.resp.email &&
      UserVarified.resp.uservarified === false
    ) {
      Alert.current.classList.replace("alert-danger", "alert-success");
      Alert.current.innerText = "Varification code sent by email";
      Alert.current.style.maxHeight = "500px";
      varificationCodeRef.current.style.display = "flex";
      setDisabled(false);
    } else {
      Alert.current.classList.replace("alert-success", "alert-danger");
      Alert.current.innerText = "User Not Found";
      Alert.current.style.maxHeight = "500px";
      setDisabled(false);
    }
  };
  const PasswordInput = (x) => {
    Alert.current.style.maxHeight = "0px";
    setCredentials({ ...Credentials, Password: x.target.value });
  };
  const LogInSubmit = async () => {
    console.log("Log in");
    console.log(Credentials);
    Alert.current.style.maxHeight = "0px";
    if (Credentials.Email.length > 0 && Credentials.Password.length > 0) {
      setDisabled(true);
      LoginButtonRef.current.innerText = "Loggin please wait";
      console.log("Submitted");
      const UserLogIn = await fetch(
        "http://localhost:5000/AdminLogIn",
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
          return "user Not Added";
        });
      if (UserLogIn.resp) {
        LoginButtonRef.current.innerText = "Login";
        if (typeof UserLogIn.resp === "object") {
          if (UserLogIn.resp.email && UserLogIn.resp.uservarified === true) {
            setGlobal(
              UserLogIn.resp.name,
              true,
              UserLogIn.resp.email,
              true,
              false,
              false,
              UserLogIn.resp.token
            );
            Alert.current.classList.replace("alert-danger", "alert-success");
            Alert.current.innerText = "User Logged in successfully";
            Alert.current.style.maxHeight = "500px";
          } else if (
            UserLogIn.resp.email &&
            UserLogIn.resp.uservarified === false
          ) {
            Alert.current.classList.replace("alert-danger", "alert-success");
            Alert.current.innerText = "Varification code sent by email";
            Alert.current.style.maxHeight = "500px";
            varificationCodeRef.current.style.display = "flex";
            setDisabled(false);
          } else {
            Alert.current.classList.replace("alert-success", "alert-danger");
            Alert.current.innerText = "User Not Found";
            Alert.current.style.maxHeight = "500px";
            setDisabled(false);
          }
        } else if (UserLogIn.resp === "Connection error") {
          Alert.current.classList.replace("alert-success", "alert-danger");
          Alert.current.innerText = "Connection error";
          Alert.current.style.maxHeight = "500px";
          setDisabled(false);
        } else if (UserLogIn.resp === "Varification Code sent by email") {
          Alert.current.classList.replace("alert-success", "alert-danger");
          Alert.current.innerText = "Varification Code sent by email";
          Alert.current.style.maxHeight = "500px";
          varificationCodeRef.current.style.display = "flex";
        } else if (UserLogIn.resp === "User varified") {
          setGlobal(
            UserLogIn.resp.name,
            true,
            UserLogIn.resp.email,
            true,
            false,
            false,
            UserLogIn.resp.token
          );
          Alert.current.classList.replace("alert-danger", "alert-success");
          Alert.current.innerText = "User Logged in successfully";
          Alert.current.style.maxHeight = "500px";
          setDisabled(false);
        } else {
          Alert.current.classList.replace("alert-success", "alert-danger");
          Alert.current.innerText = "User not found";
          Alert.current.style.maxHeight = "500px";
          setDisabled(false);
        }
      } else {
        Alert.current.classList.replace("alert-success", "alert-danger");
        Alert.current.innerText = "User Not Found";
        Alert.current.style.maxHeight = "500px";
      }
    } else {
      setDisabled(false);
      Alert.current.classList.replace("alert-success", "alert-danger");
      Alert.current.innerText = "Enter Email/Password";
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
      <label htmlFor="Email">
        <b>Email</b>
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
        <b>Password</b>
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
        onClick={() => LogInSubmit()}
      >
        Login
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
            onClick={() => VarifyEmail()}
          >
            Varify
          </button>
        </Col>
      </Row>
      <div style={{ textAlign: "start" }}>
        <span>
          {" "}
          Forgot password{" "}
          <span
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/PasswordRecovery");
            }}
          >
            Click here
          </span>
        </span>
      </div>
    </div>
  );
};
export default AdminLogIn;
