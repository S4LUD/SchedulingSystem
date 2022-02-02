import React from "react";
import { useLocation, Link } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const GotoAbout = () => {
    document.getElementById("about").scrollIntoView();
  };
  const GotoFeature = () => {
    document.getElementById("feature").scrollIntoView();
  };
  return (
    <>
      <div className="nav-con">
        <div className="nav-logo">coesched</div>
        <div className="nav-btn">
          {location.pathname === "/" ? (
            <>
              <div className="nav-btns nav-cd" onClick={() => GotoAbout()}>
                About
              </div>
              <div className="nav-btns nav-cd" onClick={() => GotoFeature()}>
                Features
              </div>
              <Link to="/login">
                <div className="nav-cdl">Login</div>
              </Link>
            </>
          ) : location.pathname === "/dashboard" ? (
            <>
              {/* <div className="nav-btns nav-cd">About Us</div>
              <div className="nav-btns nav-cd">How To</div> */}
              <Link to="/">
                <div className="nav-btns nav-cd">Log Out</div>
              </Link>
            </>
          ) : location.pathname === "/login" ? (
            <>
              <Link to="/">
                <div className="nav-btns nav-cd">Home</div>
              </Link>
            </>
          ) : location.pathname === "/schedule" ? (
            <>
              <Link to="/dashboard">
                <div className="nav-btns nav-cd ">Home</div>
              </Link>
              <Link to="/management">
                <div className="nav-btns nav-cd">Management</div>
              </Link>
              <Link to="/schedule">
                <div className="nav-btns nav-cd hilight">Schedule</div>
              </Link>
              <Link to="/class/schedule">
                <div className="nav-btns nav-cd">View Class Schedules</div>
              </Link>
              <Link to="/class/instructor">
                <div className="nav-btns nav-cd">View Intructor Schedules</div>
              </Link>
            </>
          ) : location.pathname === "/management" ? (
            <>
              <Link to="/dashboard">
                <div className="nav-btns nav-cd">Home</div>
              </Link>
              <Link to="/management">
                <div className="nav-btns nav-cd hilight">Management</div>
              </Link>
              <Link to="/schedule">
                <div className="nav-btns nav-cd">Schedule</div>
              </Link>
              <Link to="/class/schedule">
                <div className="nav-btns nav-cd">View Class Schedules</div>
              </Link>
              <Link to="/class/instructor">
                <div className="nav-btns nav-cd">View Intructor Schedules</div>
              </Link>
            </>
          ) : location.pathname === "/management/room" ? (
            <>
              <Link to="/dashboard">
                <div className="nav-btns nav-cd">Home</div>
              </Link>
              <Link to="/management">
                <div className="nav-btns nav-cd hilight">Management</div>
              </Link>
              <Link to="/schedule">
                <div className="nav-btns nav-cd">Schedule</div>
              </Link>
              <Link to="/class/schedule">
                <div className="nav-btns nav-cd">View Class Schedules</div>
              </Link>
              <Link to="/class/instructor">
                <div className="nav-btns nav-cd">View Intructor Schedules</div>
              </Link>
            </>
          ) : location.pathname === "/management/section" ? (
            <>
              <Link to="/dashboard">
                <div className="nav-btns nav-cd">Home</div>
              </Link>
              <Link to="/management">
                <div className="nav-btns nav-cd hilight">Management</div>
              </Link>
              <Link to="/schedule">
                <div className="nav-btns nav-cd">Schedule</div>
              </Link>
              <Link to="/class/schedule">
                <div className="nav-btns nav-cd">View Class Schedules</div>
              </Link>
              <Link to="/class/instructor">
                <div className="nav-btns nav-cd">View Intructor Schedules</div>
              </Link>
            </>
          ) : location.pathname === "/management/subject" ? (
            <>
              <Link to="/dashboard">
                <div className="nav-btns nav-cd">Home</div>
              </Link>
              <Link to="/management">
                <div className="nav-btns nav-cd hilight">Management</div>
              </Link>
              <Link to="/schedule">
                <div className="nav-btns nav-cd">Schedule</div>
              </Link>
              <Link to="/class/schedule">
                <div className="nav-btns nav-cd">View Class Schedules</div>
              </Link>
              <Link to="/class/instructor">
                <div className="nav-btns nav-cd">View Intructor Schedules</div>
              </Link>
            </>
          ) : location.pathname === "/management/instructor" ? (
            <>
              <Link to="/dashboard">
                <div className="nav-btns nav-cd">Home</div>
              </Link>
              <Link to="/management">
                <div className="nav-btns nav-cd hilight">Management</div>
              </Link>
              <Link to="/schedule">
                <div className="nav-btns nav-cd">Schedule</div>
              </Link>
              <Link to="/class/schedule">
                <div className="nav-btns nav-cd">View Class Schedules</div>
              </Link>
              <Link to="/class/instructor">
                <div className="nav-btns nav-cd">View Intructor Schedules</div>
              </Link>
            </>
          ) : location.pathname === "/class/schedule" ? (
            <>
              <Link to="/dashboard">
                <div className="nav-btns nav-cd">Home</div>
              </Link>
            </>
          ) : location.pathname === "/class/instructor" ? (
            <>
              <Link to="/dashboard">
                <div className="nav-btns nav-cd">Home</div>
              </Link>
            </>
          ) : undefined}
        </div>
      </div>
    </>
  );
};

export default Navigation;
