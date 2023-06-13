import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import {useLogin} from '../../hooks/useLogin';

const Login = () => {
  const [input, setInput] = useState({
    emailOrMobileNumber:"",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const {login, error, isLoading} = useLogin()
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


 const handelSubmit =async()=>{
    try{
// console.log(input, "godInput");

await  login(input.emailOrMobileNumber, input.password)

    }catch(err){
// console.log(err);
    }
 }

  return (
    <div className="mainContainer">
      <div className="leftDev">
        <img src="./greenify-removebg.png" alt="/" />
      </div>
      <div className="rightDev">
        <div className="container">
          <div className="inputs">
            <input
              type="text"
              required
              onChange={(e) =>
                setInput({ ...input, emailOrMobileNumber: e.target.value })
              }
            />
            <label>Email or Mobile Number</label>
          </div>
          <div className="inputs">
            <input
                    type={showPassword ? "text" : "password"}
              required
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            
            <label>Password</label>      <button
             style={{
              background: "#3bb19b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px",
              borderRadius: "5px",
              color: "#fff",
              cursor: "pointer",
            }}
            
            onClick={handleTogglePassword}>
        {showPassword ? "Hide" : "Show"}
      </button>
          </div>
          <div
            style={{
              background: "#3bb19b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 0",
              borderRadius: "5px",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={handelSubmit}
          >
            Login
          </div>
          <p style={{ width: "100%", textAlign: "center", padding: "5px 0" }}>
            or
          </p>
          <Link
            style={{
              background: "#3bb19b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 0",
              borderRadius: "5px",
              color: "#fff",
              cursor: "pointer",
            }}
            to="/signup"
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;