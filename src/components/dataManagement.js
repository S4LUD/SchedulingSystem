import React from "react";
import { useLocation, Link } from "react-router-dom";
import Navigation from "./navigation";
import Room from "./room";
import Subject from "./subject";
import Instructor from "./instructor";
import Section from "./section";

const DataManagement = () => {
  document.title = "Management";
  const location = useLocation();

  return (
    <>
      <Navigation />
      <div className="management-con">
        <div className="internal-nav">
          <Link to="/management/room">
            <div
              className="nav-btn"
              style={{
                background:
                  location.pathname === "/management"
                    ? "#dbdee2"
                    : location.pathname === "/management/room"
                    ? "#dbdee2"
                    : undefined,
              }}
            >
              Room
            </div>
          </Link>
          <Link to="/management/section">
            <div
              className="nav-btn"
              style={{
                background:
                  location.pathname === "/management/section"
                    ? "#dbdee2"
                    : undefined,
              }}
            >
              Section
            </div>
          </Link>
          <Link to="/management/subject">
            <div
              className="nav-btn"
              style={{
                background:
                  location.pathname === "/management/subject"
                    ? "#dbdee2"
                    : undefined,
              }}
            >
              Subject
            </div>
          </Link>
          <Link to="/management/instructor">
            <div
              className="nav-btn"
              style={{
                background:
                  location.pathname === "/management/instructor"
                    ? "#dbdee2"
                    : undefined,
              }}
            >
              Instructor
            </div>
          </Link>
        </div>
        {location.pathname === "/management" ? (
          <Room />
        ) : location.pathname === "/management/room" ? (
          <Room />
        ) : location.pathname === "/management/section" ? (
          <Section />
        ) : location.pathname === "/management/subject" ? (
          <Subject />
        ) : location.pathname === "/management/instructor" ? (
          <Instructor />
        ) : undefined}
      </div>
    </>
  );
};

export default DataManagement;
