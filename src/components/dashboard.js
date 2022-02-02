import React from "react";
import Navigation from "./navigation";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  document.title = "Dashboard";
  return (
    <>
      <Navigation />
      <div className="dash-con">
        <div className="info">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="co-eng">COLLEGE OF ENGINEERING</div>
          <hr />
          <div className="c-sched">CLASS SCHEDULE</div>
          <div className="btns">
            <Link to="/schedule">
              <div className="btn">Create Class Schedule</div>
            </Link>
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

export default Dashboard;
