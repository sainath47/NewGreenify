import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import {useRegister} from '../../hooks/useRegister';
const SignUp = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const {register, error, isLoading} = useRegister()

  const handelSubmit = async (e) => {
    e.preventDefault();
    await register(input.email, input.password)


  };

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
                  setInput({ ...input, firstName: e.target.value })
                }
              />
              <label>First Name</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                required
                onChange={(e) =>
                  setInput({ ...input, lastName: e.target.value })
                }
              />
              <label>Last Name</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                required
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
              <label>Register Email</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                required
                onChange={(e) =>
                  setInput({ ...input, mobileNumber: e.target.value })
                }
              />
              <label>Register Mobile Number</label>
            </div>
            <div className="inputs">
              <input
                type="password"
                required
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
              <label>Password</label>
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
              onClick={(e)=>handelSubmit(e)}
            >
              SignUp
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
              to="/login"
            >
              Login
            </Link>
          </div>
        
      </div>
    </div>
  );
};

export default SignUp;
