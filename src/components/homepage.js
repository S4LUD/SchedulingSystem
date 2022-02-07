import React, { useLayoutEffect, useState } from "react";
import Navigation from "./navigation";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/school-logo.png";
import Api from "./api.json";

const Homepage = () => {
  document.title = "Homepage";
  const VerifyAPI = `${Api.api}/api/verify`;
  const navigate = useNavigate();
  const [isVerify, setVerify] = useState(false);

  useLayoutEffect(() => {
    setVerify(true);
    const AbortCntrlr = new AbortController();

    const VerifyRequest = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      redirect: "follow",
    };

    setTimeout(() => {
      fetch(VerifyAPI, VerifyRequest, { signal: AbortCntrlr.signal })
        .then((response) => response.json())
        .then((result) => {
          if (result._id) {
            sessionStorage.setItem("ss-crdntl-vld", "true");
            navigate("/dashboard", { replace: true });
          }
          sessionStorage.setItem("ss-crdntl-vld", "false");
          setVerify(false);
        });
    }, 1000);

    return () => AbortCntrlr.abort();
  }, [VerifyAPI, navigate]);
  return (
    <>
      <Navigation />
      {isVerify ? (
        <div className="verified">
          <img src={Image} alt="Logo" />
          <span>Checking Credentials... Please wait.</span>
        </div>
      ) : undefined}
      <div className="dash-con">
        <div className="info">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="co-eng">COLLEGE OF ENGINEERING</div>
          <hr />
          <div className="c-sched">CLASS SCHEDULE</div>
          <div className="btns">
            <Link to="/class/schedule">
              <div className="btn">View Class Schedule</div>
            </Link>
            <Link to="/class/instructor">
              <div className="btn">View Professor Schedule</div>
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

export default Homepage;
