import React from "react";
import Navigation from "./navigation";
import schedule from "../assets/schedule.png";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Homepage = () => {
  document.title = "Homepage";
  return (
    <>
      <Navigation />
      <div className="home-con-1">
        <div className="schl">COLLEGE OF ENGINEERING</div>
        <div className="class-sched">CLASS SCHEDULE</div>
        <div className="hc1-btn">
          <Link to="/class/schedule">
            <div className="btns">View Class Schedule</div>
          </Link>
          <Link to="/class/instructor">
            <div className="btns">View Professor Schedule</div>
          </Link>
        </div>
      </div>
      <div className="home-con-2" id="about">
        <div className="sched-mg">
          <img src={schedule} alt="schedule" />
        </div>
        <div className="desc">
          <div className="desc-title">COESCHED</div>
          <div className="desc-content">
            coesched helps student and instructors of the engineering department
            in Laguna State Polytechnic University - San Pablo City Campus to
            look upon their given schedules, it also helps the department to
            make class schedules.
          </div>
        </div>
      </div>
      <div id="feature" />
      <div className="home-con-3">
        <div className="title">Features</div>
        <div className="feature-box">
          <div className="boxes">
            <div className="box-title">Create Class Schedule</div>
            <div className="box-desc">Avoids Conflicted Schedule</div>
          </div>
          <div className="boxes">
            <div className="box-title">View Class Schedules</div>
            <div className="box-desc">See it anytime</div>
          </div>
          <div className="boxes">
            <div className="box-title">Print Schedules</div>
            <div className="box-desc">Templated Format</div>
          </div>
          <div className="boxes">
            <div className="box-title">Edit Class Schedule</div>
            <div className="box-desc">1000's of colors</div>
          </div>
        </div>
      </div>
      <div className="home-con-4">
        <div className="hc4-con">
          <div className="title">CREATE CLASS SCHEDULE</div>
          <div className="hc4-btn">
            <div className="btn-title">Login to create</div>
            <div className="btns">Login</div>
          </div>
        </div>
        <div className="hc4-box">image</div>
      </div>
      <div className="footer">
        <div className="topinfo">
          <div className="box">
            <div className="title">About Us</div>
            <div className="links">
              <div className="link-btn">How it works</div>
            </div>
          </div>
          <div className="box">
            <div className="title">Contact Us</div>
            <div className="links">
              <div className="link-btn">Contact</div>
            </div>
          </div>
          <div className="box">
            <div className="title">Social Media</div>
            <div className="links">
              <div className="link-btn">Instagram</div>
              <div className="link-btn">Facebook</div>
              <div className="link-btn">Youtube</div>
              <div className="link-btn">Twitter</div>
            </div>
          </div>
        </div>
        <div className="bottominfo">
          <div className="title">coesched</div>
          <div className="copyrights">© coesched 2021. All rights reserved</div>
          <div className="socmed-links">
            <FaFacebook size={28} color="#3b5998" />
            <FaInstagram size={28} color="#ffffff" />
            <FaYoutube size={28} color="#ff0000" />
            <FaLinkedin size={28} color="#0e76a8" />
            <FaTwitter size={28} color="#00acee" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
