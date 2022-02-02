import React from "react";
import Navigation from "./navigation";
import Logo from "../assets/logo.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Navigation />
      <div className="login-con">
        <div className="left-info">
          <div className="top-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="co-eng">COLLEGE OF ENGINEERING</div>
          <hr />
          <div className="c-sched">CLASS SCHEDULE</div>
        </div>
        <div className="right-info">
          <div className="login-wrappper">
            <div className="log-title">LOGIN</div>
          </div>
          <div className="r-con">
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="username"
            />
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="password"
            />
          </div>
          <div className="btn">
            <Link to="/dashboard">
              <div className="btn-dsgn">
                LOGIN
                <FaLongArrowAltRight />
              </div>
            </Link>
          </div>
        </div>
        <div className="about">
          <div className="title">ABOUT THIS SITE</div>
          <div className="desc">
            coeshed helps the student and instructors of the college department
            in Laguna State Polytechnic University to look upon their given
            schedules, it also helps the department to make class schedules.
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
