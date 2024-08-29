import React, { useEffect, useRef, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StaticData from "../Data/StaticData";
import { toast } from "react-toastify";

const SignUp = ({ globalState, setGlobal }) => {
  const [Governorate,SetGovernorate]=useState("")
  const [City,SetCity]=useState("")
  const [Disabled, setDisabled] = useState(false); // this will be used to disable all fields edit after signup button pressed
  const [SignUpBtn, setButton] = useState(true); // Signup button disabled attrebute
  const [ConfirmPassword, setConfirmPassword] = useState(true); // true if password matches password requirements
  const [PasswordCheckState, setPasswordCheckState] = useState(false); // true if password matches password criteria
  const [Passwordmatch, setPasswordmatch] = useState(false);
  const [Credentials, setCredentials] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPass: "",
    Governorate:Governorate,
    City:City
  });
  const PasswordCheck = {
    LowerCase: false,
    UpperCase: false,
    NumberCase: false,
    LengthCase: false,
  };
  const navigate = useNavigate();
  const PasswordValue = useRef();
  const ConfirmPasswordValue = useRef();
  const PassmatchAlert = useRef();
  const varificationCodeRef = useRef();
  const ContainerRef = useRef();

  // function for password requirements
  //  below we used useRef to wrap every document.getElementById then in useEffect we assigned every useref.current to its element

  let myInput = document.getElementById("psw");
  let letter = useRef(document.getElementById("letter"));
  let capital = useRef(document.getElementById("capital"));
  let number = useRef(document.getElementById("number"));
  let length = useRef(document.getElementById("length"));

  useEffect(() => {
    if (globalState.Name.length > 0) {
      navigate("/");
    }

    const el1 = document.getElementById("letter");
    const el2 = document.getElementById("capital");
    const el3 = document.getElementById("number");
    const el4 = document.getElementById("length");
    if (el1) {
      letter.current = el1;
    }
    if (el2) {
      capital.current = el2;
    }
    if (el3) {
      number.current = el3;
    }
    if (el4) {
      length.current = el4;
    }
  });

  const EnterEmail = (x) => {
    let curr = x.target.value.length - 1;
    let EmailValue = "";

    console.log(curr);

    setCredentials({ ...Credentials, Email: x.target.value });
    console.log(Credentials);

    // console.log(x.target.value)
    // const regex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    // if (x.target.value.match(regex)) {

    //   console.log("Email correct")

    // } else {
    //   console.log("Email Not correct")

    // }
  };

  const focus = () => {
    document.getElementById("Alert").style.display = "block";
    PassmatchAlert.current.style.maxHeight = "0px";
  };

  const blur = () => {
    document.getElementById("Alert").style.display = "none";
  };

  const KeyUp = (x) => {
    console.log(x.target.value);
    console.log(letter.current.className);
    ConfirmPasswordValue.current.value = "";

    let lowerCaseLetters = /[a-z]/g;
    if (x.target.value.match(lowerCaseLetters)) {
      letter.current.classList.remove("PassInvalid");
      letter.current.classList.add("PassValid");
      PasswordCheck.LowerCase = true;
    } else {
      letter.current.classList.remove("PassValid");
      letter.current.classList.add("PassInvalid");
      PasswordCheck.LowerCase = false;
    }

    // Validate capital letters
    let upperCaseLetters = /[A-Z]/g;
    if (x.target.value.match(upperCaseLetters)) {
      capital.current.classList.remove("PassInvalid");
      capital.current.classList.add("PassValid");
      PasswordCheck.UpperCase = true;
    } else {
      capital.current.classList.remove("PassValid");
      capital.current.classList.add("PassInvalid");
      PasswordCheck.UpperCase = false;
    }

    // Validate numbers
    let numbers = /[0-9]/g;
    if (x.target.value.match(numbers)) {
      number.current.classList.remove("PassInvalid");
      number.current.classList.add("PassValid");
      PasswordCheck.NumberCase = true;
    } else {
      number.current.classList.remove("Passvalid");
      number.current.classList.add("PassInvalid");
      PasswordCheck.NumberCase = false;
    }

    // Validate length
    if (x.target.value.length >= 8) {
      length.current.classList.remove("PassInvalid");
      length.current.classList.add("Passvalid");
      PasswordCheck.LengthCase = true;
    } else {
      length.current.classList.remove("Passvalid");
      length.current.classList.add("PassInvalid");
      PasswordCheck.LengthCase = false;
    }

    console.log(PasswordCheck);
    setConfirmPassword(false);

    if (
      PasswordCheck.LowerCase === true &&
      PasswordCheck.UpperCase === true &&
      PasswordCheck.NumberCase === true &&
      PasswordCheck.LengthCase === true
    ) {
      console.log(PasswordCheck);
      setPasswordCheckState(true);
    } else {
      setPasswordCheckState(false);
      console.log(PasswordCheck);
    }

    ConfirmPasswordCheck();
    setCredentials({ ...Credentials, Password: x.target.value });
  };

  const ConfirmPasswordCheck = () => {
    if (
      PasswordValue.current.value.length === 0 ||
      ConfirmPasswordValue.current.value.length === 0 ||
      PasswordCheckState === false
    ) {
      PassmatchAlert.current.classList.replace("alert-success", "alert-danger");
      PassmatchAlert.current.innerText = "Password mismatch";
      setPasswordmatch(false);
      console.log("Password mismatch");
    } else {
      if (
        PasswordValue.current.value === ConfirmPasswordValue.current.value &&
        PasswordCheckState === true
      ) {
        PassmatchAlert.current.classList.replace(
          "alert-danger",
          "alert-success"
        );
        PassmatchAlert.current.innerText = "Password match";
        setPasswordmatch(true);
        setButton(false);
      } else {
        PassmatchAlert.current.classList.replace(
          "alert-success",
          "alert-danger"
        );
        PassmatchAlert.current.innerText = "Password mismatch";
        setPasswordmatch(false);

        console.log("Password mismatch");
      }
    }

    setCredentials({
      ...Credentials,
      ConfirmPass: ConfirmPasswordValue.current.value,
    });
    console.log(Credentials.ConfirmPass);
  };

  const SignUpSubmit = async () => {
    setButton(true);
    setConfirmPassword(true);
    setDisabled(true);

    console.log(Credentials);
    const emailregx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordregex = /[a-zA-z0-9.-_@#$%^&*]/;
    const whiteSpaceRegex = /\s/;

    if (
      Credentials.Email.length > 0 &&
      Credentials.Password.length > 0 &&
      Credentials.ConfirmPass.length > 0 &&
      Credentials.Name.length > 0 &&
      Credentials.Password === Credentials.ConfirmPass &&
      PasswordCheckState === true && Credentials.Governorate.length>0 && Credentials.City.length>0
    ) {
      if (
        Credentials.Email.match(whiteSpaceRegex) ||
        Credentials.Password.match(whiteSpaceRegex) ||
        Credentials.Email.match(/[ء-ي]+/) ||
        Credentials.Password.match(/[ء-ي]+/) ||
        Credentials.Name.match(/[ء-ي]+/)
      ) {
        PassmatchAlert.current.classList.replace(
          "alert-success",
          "alert-danger"
        );
        PassmatchAlert.current.innerText =
          "Name/Email/Password cannot contain spaces  or arabic alphabit";
        PassmatchAlert.current.style.maxHeight = "500px";
        setButton(false);
        setConfirmPassword(false);
        setDisabled(false);
      } else {
        if (
          Credentials.Email.match(emailregx) &&
          Credentials.Password.match(passwordregex)
        ) {
          console.log("Email correct");
          PassmatchAlert.current.classList.replace(
            "alert-danger",
            "alert-success"
          );
          PassmatchAlert.current.innerText = "";
          PassmatchAlert.current.style.maxHeight = "0px";
          console.log(JSON.stringify(Credentials));
          console.log(Credentials.Email.length);
          console.log(Credentials.Password.length);

          // for (let index = 0; index <Credentials.Email.length; index++) {
          //   const element = Credentials.Email[index];

          //   if (element.match(/^[a-zA-Z0-9@._-]/)) {
          //     console.log("Email passed")

          //   }

          // }

          // for (let index = 0; index <Credentials.Password.length; index++) {
          //   const element = Credentials.Password[index];

          //   if (element.match(passwordregex)) {
          //     console.log("Password passed")

          //   }

          // }

          console.log("Email password checked");
          ContainerRef.current.style.cursor = "wait";

          PassmatchAlert.current.classList.replace(
            "alert-danger",
            "alert-success"
          );
          PassmatchAlert.current.innerText = "Sign Up please wait";
          PassmatchAlert.current.style.maxHeight = "500px";

          const AddUser = await fetch(
            "http://localhost:5000/AddUser",
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

          // const result=await AddUser.json()

          console.log(AddUser);
          ContainerRef.current.style.cursor = "default";

          if (typeof AddUser.resp === "object") {
            console.log(AddUser.resp);

            PassmatchAlert.current.classList.replace(
              "alert-danger",
              "alert-success"
            );
            PassmatchAlert.current.innerText =
              AddUser.resp.name +
              " Added successfully an email has been sent to your email address with varification code Please enter varification code below";
            PassmatchAlert.current.style.maxHeight = "500px";
            varificationCodeRef.current.style.display = "flex";
            setButton(true);
            setConfirmPassword(true);
            setDisabled(true);
            // setGlobal(AddUser.resp.name,true,AddUser.resp.email)
            // navigate("/")
          } else {
            PassmatchAlert.current.classList.replace(
              "alert-success",
              "alert-danger"
            );
            PassmatchAlert.current.innerText = AddUser.resp;
            PassmatchAlert.current.style.maxHeight = "500px";
            setButton(false);
            setConfirmPassword(false);
            setDisabled(false);
          }
        } else {
          PassmatchAlert.current.classList.replace(
            "alert-success",
            "alert-danger"
          );
          PassmatchAlert.current.innerText = "Email/Password not correct";
          PassmatchAlert.current.style.maxHeight = "500px";

          setButton(false);
          setConfirmPassword(false);
          setDisabled(false);
        }
      }
    } else {
      PassmatchAlert.current.classList.replace("alert-success", "alert-danger");
      PassmatchAlert.current.innerText = "Please complete/check all fields";
      PassmatchAlert.current.style.maxHeight = "500px";

      setButton(false);
      setConfirmPassword(false);
      setDisabled(false);
    }

    // console.log(Passwordmatch)
    // console.log(PasswordCheckState)
    // if (Passwordmatch===true && PasswordCheckState===true) {
    //   console.log( "submitted")

    // } else {
    //   PassmatchAlert.current.classList.replace("alert-success","alert-danger")
    //   PassmatchAlert.current.style.maxHeight="500px"
    //   PassmatchAlert.current.innerText="Password requirements/match error"

    // }
  };

  const VarifyEmail = async () => {
    console.log(Credentials);
    console.log(typeof Credentials.VarificationCode);

    const UserVarified = await fetch(
      "http://localhost:5000/LogInUser",
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
      setGlobal(UserVarified.resp.name, true, UserVarified.resp.email, false);
      PassmatchAlert.current.classList.replace("alert-danger", "alert-success");
      PassmatchAlert.current.innerText = "User Logged in successfully";
      PassmatchAlert.current.style.maxHeight = "500px";
    } else if (
      UserVarified.resp.email &&
      UserVarified.resp.uservarified === false
    ) {
      PassmatchAlert.current.classList.replace("alert-danger", "alert-success");
      PassmatchAlert.current.innerText = "Varification code sent by email";
      PassmatchAlert.current.style.maxHeight = "500px";
      varificationCodeRef.current.style.display = "flex";
      setDisabled(false);
    } else {
      PassmatchAlert.current.classList.replace("alert-success", "alert-danger");
      PassmatchAlert.current.innerText = "Varification code sent by email";
      PassmatchAlert.current.style.maxHeight = "500px";
      setDisabled(false);
    }
  };

  // const KeyUp=()=>{

  // -----------------------------------

  return (
    <div
      ref={ContainerRef}
      className="container1"
      onClick={() => {
        console.log(PasswordCheck);
        console.log(PasswordCheckState);
        console.log(Credentials);
        console.log(new Date());

        console.log(globalState);
      }}
    >
      <label htmlFor="name">
        <b>Name</b>
      </label>
      <input
        type="text"
        placeholder="Enter name"
        name="name"
        disabled={Disabled}
        onKeyUp={(e) => {
          setCredentials({ ...Credentials, Name: e.target.value });
        }}
        required
      />

      <label htmlFor="email">
        <b>E-mail</b>
      </label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        disabled={Disabled}
        onKeyUp={(e) => EnterEmail(e)}
        required
      />
     <Row>
      <Col className=" d-flex flex-column my-3" xs={12} md={6}>
      <div >
        Please select your Governorate
      </div>
      <select onChange={(e)=>{
        if (e.target.value==="Please select Governorate") {
          toast.error("Please select Governorate")
          SetGovernorate("") 
          setCredentials({...Credentials,Governorate:"", City:""}) 
        } else {
          SetGovernorate(e.target.value) 
          setCredentials({ ...Credentials, Governorate: e.target.value });
        }
      }}>
        <option>
          Please select Governorate
        </option>
        {Array.isArray(Object.keys(StaticData.Cities))?Object.keys(StaticData.Cities).map((city)=>(<option key={city}>{city}</option>)):""}
      </select>

      </Col>
      <Col className=" d-flex flex-column my-3" xs={12} md={6}>
      <div>
        Please select your City
      </div>
      <select onChange={(e)=>{
        if (e.target.value==="Please select a City") {
          toast.error("Please select a City")
          SetCity("")  
          setCredentials({...Credentials,City:""}) 
        } else {
          SetCity(e.target.value)
          setCredentials({...Credentials,City:e.target.value})  
        }
      }}>
        <option>
          Please select a City
        </option>
        {StaticData.Cities[Governorate] && Array.isArray(Object.keys(StaticData.Cities[Governorate]))?Object.keys(StaticData.Cities[Governorate]).map((city)=>(<option key={city}>
          {city}
        </option>)):""}
      </select>

      </Col>
     </Row>

      <label htmlFor="psw">
        <b>Password</b>
      </label>
      <input
        ref={PasswordValue}
        id="psw"
        type="password"
        pattern="[0-9]{3}"
        placeholder="Enter Password"
        name="psw"
        disabled={Disabled}
        onFocus={() => focus()}
        onBlur={() => blur()}
        onKeyUp={(e) => KeyUp(e)}
        required
      />

      <div className="d-flex flex-wrap">
        {/* in the following used w-100 class and wordWrap style to break work indide the div width */}
        <div
          id="Alert"
          className=" alert alert-primary w-100"
          style={{ wordWrap: "break-word" }}
          role="alert"
        >
          <h3>Password must contain the following:</h3>
          <p id="letter" className="PassInvalid">
            A <b>lowercase</b> letter
          </p>
          <p id="capital" className="PassInvalid">
            A <b>capital (uppercase)</b> letter
          </p>
          <p id="number" className="PassInvalid">
            A <b>number</b>
          </p>
          <p id="length" className="PassInvalid">
            Minimum <b>8 characters</b>
          </p>
        </div>
      </div>

      <label htmlFor="confirmpsw">
        <b>Confirm Password</b>
      </label>
      <div className="d-block" style={{ boxSizing: "border-box" }}>
        <input
          ref={ConfirmPasswordValue}
          type="password"
          placeholder="Confirm Password"
          name="confirmpsw"
          onFocus={() => {
            ConfirmPasswordCheck();

            PassmatchAlert.current.style.maxHeight = "500px";
          }}
          onBlur={() => {
            PassmatchAlert.current.style.maxHeight = "0px";
          }}
          onKeyUp={() => ConfirmPasswordCheck()}
          required
          disabled={ConfirmPassword}
        />

        <div
          ref={PassmatchAlert}
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
      </div>

      <button
        className="SignUpButton"
        disabled={SignUpBtn}
        onClick={() => SignUpSubmit()}
      >
        SignUp
      </button>

      <span className="psw">
        have account{" "}
        <span
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/LogIn");
          }}
        >
          LogIn
        </span>
      </span>
    </div>
  );
};

export default SignUp;
