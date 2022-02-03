import React, { useState, useEffect } from "react";
import Navigation from "./navigation";
import { FaTrashAlt, FaAngleDown } from "react-icons/fa";
import Api from "./api.json";

const CreateSchedule = () => {
  document.title = "Schedule";
  const [isRoom, setRoom] = useState([]);
  const [isSection, setSection] = useState([]);
  const [isSubject, setSubject] = useState([]);
  const [isIntructor, setIntructor] = useState([]);
  const [isCourse, setCourse] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [isBotDisabled, setBotDisabled] = useState(true);
  const [isSchedule, setSchedule] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [isID, setID] = useState("");
  const [isErrorDescription, setErrorDescription] = useState("");
  const [isError, setError] = useState("");
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [isSelectSection, setSelectSection] = useState("");
  const [isSelectedRoom, setSelectedRoom] = useState("");
  const [isSelectedDay, setSelectedDay] = useState("");
  const [isSelectedTimeslot, setSelectedTimeslot] = useState("");
  const [isSelectedSubject, setSelectedSubject] = useState("");
  const [isSelectedInstructor, setSelectedInstructor] = useState("");
  const [isSelectedCourse, setSelectedCourse] = useState("");

  const RoomAPI = `${Api.api}/api/room`;
  const SubjectAPI = `${Api.api}/api/subject`;
  const InstructorAPI = `${Api.api}/api/instructor`;
  const CourseAPI = `${Api.api}/api/course`;
  const SearchCourseAPI = `${Api.api}/api/search-by-course/`;
  const SearchSectionAPI = `${Api.api}/api/search-by-section/`;
  const ScheduleAPI = `${Api.api}/api/schedule`;

  useEffect(() => {
    const GetCourseRequest = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };

    const GetRoomRequest = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };

    const GetSubjectRequest = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };

    const GetInstructotRequest = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };

    (async () => {
      await fetch(CourseAPI, GetCourseRequest)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch the data");
          }
          return response.json();
        })
        .then((result) => setCourse(result))
        .catch((error) => console.log("error", error));
    })();

    (async () => {
      await fetch(RoomAPI, GetRoomRequest)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch the data");
          }
          return response.json();
        })
        .then((result) => setRoom(result))
        .catch((error) => console.log("error", error));
    })();

    (async () => {
      await fetch(SubjectAPI, GetSubjectRequest)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch the data");
          }
          return response.json();
        })
        .then((result) => setSubject(result))
        .catch((error) => console.log("error", error));
    })();

    (async () => {
      await fetch(InstructorAPI, GetInstructotRequest)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch the data");
          }
          return response.json();
        })
        .then((result) => setIntructor(result))
        .catch((error) => console.log("error", error));
    })();
  }, [RoomAPI, CourseAPI, SubjectAPI, InstructorAPI]);

  const HandleSelected = (data) => {
    setSelectSection("");

    if (data === "Select")
      return (
        setDisabled(true),
        setSelectedCourse(""),
        setSection([]),
        setBotDisabled(true),
        setSchedule([])
      );
    setDisabled(false);
    setSelectedCourse(data);
    HandleGetSections(data);
  };

  const HandleGetSections = async (data) => {
    const SearchCourseRequest = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };

    await fetch(SearchCourseAPI + data, SearchCourseRequest)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((result) => setSection(result))
      .catch((error) => console.log("error", error));
  };

  const HandleGo = async () => {
    if (!isSelectSection) return;
    setBotDisabled(false);

    const SearchSectionRequest = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };

    await fetch(SearchSectionAPI + isSelectSection, SearchSectionRequest)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((result) => setSchedule(result))
      .catch((error) => console.log("error", error));
  };

  const HandleSaveSchedule = async () => {
    setLoading(true);

    const raw = JSON.stringify({
      course: isSelectedCourse,
      section: isSelectSection,
      room: isSelectedRoom,
      day: isSelectedDay,
      timeslot: isSelectedTimeslot,
      subject: isSelectedSubject,
      instructor: isSelectedInstructor,
    });

    const ScheduleRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    await fetch(ScheduleAPI, ScheduleRequest)
      .then((response) => response.json())
      .then((result) => {
        if (result.message !== "OK")
          return (
            setError(result.message),
            setErrorDescription(result.description),
            setErrorVisible(true),
            setLoading(false)
          );
        HandleGo();
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const HandleDeleteSchedule = (data) => {
    setID(data);
    setVisible(true);
  };

  const HandleModalDelete = () => {
    return (
      <div className="room-modal">
        <div className="modal-wrap">
          <div className="title">Message</div>
          <div className="modal-des">
            <div className="content">Are you sure to delete this room?</div>
          </div>
          <div className="btns">
            <div className="btn yes" onClick={() => HandleConfirm()}>
              Yes
            </div>
            <div className="btn cancel" onClick={() => setVisible(false)}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HandleConfirm = async () => {
    setLoading(true);
    const raw = JSON.stringify({
      _id: isID,
    });

    const RequestDelete = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    await fetch(ScheduleAPI, RequestDelete)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((result) => {
        if (result.message === "OK") {
          HandleGo();
          setVisible(false);
          setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Navigation />
      {isVisible ? <HandleModalDelete /> : undefined}
      {isErrorVisible ? (
        <div className="error-modal" onClick={() => setErrorVisible(false)}>
          <div className="title">Message</div>
          <div className="err-con">
            <div className="top-detail">{isError}</div>
            <div className="bot-detail">{isErrorDescription}</div>
          </div>
          <div className="btn" onClick={() => setErrorVisible(false)}>
            Close
          </div>
        </div>
      ) : undefined}
      {isLoading ? <div className="Loading" /> : undefined}
      <div className="create-con">
        <div className="sched-con-wrap">
          <div className="left-con">
            <div className="top-wrap">
              <div className="title">View Course &amp; Class</div>
              <div className="top-con">
                <div className="inputs-con">
                  <div className="selection">
                    <div className="input-title">Course</div>
                    <div className="custom-select">
                      <select
                        value={isSelectedCourse}
                        onChange={(data) => HandleSelected(data.target.value)}
                      >
                        <option>Select</option>
                        {isCourse.map((data) => {
                          return (
                            <option key={data._id} value={data.course}>
                              {data.course}
                            </option>
                          );
                        })}
                      </select>
                      <div className="custom-icon">
                        <FaAngleDown color="#EDEDED" />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`selection ${
                      isDisabled ? "disabled" : undefined
                    }`}
                  >
                    <div className="input-title">Section</div>
                    <div className="custom-select">
                      <select
                        value={isSelectSection}
                        onChange={(data) => setSelectSection(data.target.value)}
                      >
                        <option>Select</option>
                        {isSection.map((data) => {
                          return (
                            <option key={data._id} value={data.section}>
                              {data.section}
                            </option>
                          );
                        })}
                      </select>
                      <div className="custom-icon">
                        <FaAngleDown color="#EDEDED" />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`btns-con ${isDisabled ? "disabled" : undefined}`}
                  onClick={() => HandleGo()}
                >
                  <div className="btn">GO</div>
                </div>
              </div>
            </div>
            <div
              className={`bot-con ${isBotDisabled ? "disabled" : undefined}`}
            >
              <div className="title">Set Schedule</div>
              <div className="bot-wrap">
                <div className="inputs">
                  <div className="selection">
                    <div className="input-title">Room</div>
                    <div className="custom-select">
                      <select
                        value={isSelectedRoom}
                        onChange={(data) => setSelectedRoom(data.target.value)}
                      >
                        <option>Select</option>
                        {isRoom.map((data) => {
                          return (
                            <option key={data._id} value={data.room}>
                              {data.room}
                            </option>
                          );
                        })}
                      </select>
                      <div className="custom-icon">
                        <FaAngleDown color="#EDEDED" />
                      </div>
                    </div>
                  </div>
                  <div className="selection">
                    <div className="input-title">Day</div>
                    <div className="custom-select">
                      <select
                        value={isSelectedDay}
                        onChange={(data) => setSelectedDay(data.target.value)}
                      >
                        <option>Select</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                      <div className="custom-icon">
                        <FaAngleDown color="#EDEDED" />
                      </div>
                    </div>
                  </div>
                  <div className="selection">
                    <div className="input-title">Timeslot</div>
                    <div className="custom-select">
                      <select
                        value={isSelectedTimeslot}
                        onChange={(data) =>
                          setSelectedTimeslot(data.target.value)
                        }
                      >
                        <option>Select</option>
                        <option value="7:00 - 8:00">07:00 - 08:00</option>
                        <option value="8:00 - 9:00">08:00 - 09:00</option>
                        <option value="9:00 - 10:00">09:00 - 10:00</option>
                        <option value="10:00 - 11:00">10:00 - 11:00</option>
                        <option value="11:00 - 12:00">11:00 - 12:00</option>
                        <option value="12:00 - 1:00">12:00 - 01:00</option>
                        <option value="1:00 - 2:00">01:00 - 02:00</option>
                        <option value="2:00 - 3:00">02:00 - 03:00</option>
                        <option value="3:00 - 4:00">03:00 - 04:00</option>
                        <option value="4:00 - 5:00">04:00 - 05:00</option>
                      </select>
                      <div className="custom-icon">
                        <FaAngleDown color="#EDEDED" />
                      </div>
                    </div>
                  </div>
                  <div className="selection">
                    <div className="input-title">Subject</div>
                    <div className="custom-select">
                      <select
                        value={isSelectedSubject}
                        onChange={(data) =>
                          setSelectedSubject(data.target.value)
                        }
                      >
                        <option>Select</option>
                        {isSubject.map((data) => {
                          return (
                            <option key={data._id} value={data.subject}>
                              {data.subject}
                            </option>
                          );
                        })}
                      </select>
                      <div className="custom-icon">
                        <FaAngleDown color="#EDEDED" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="selection-sp">
                  <div className="input-title">Instructor</div>
                  <div className="custom-select">
                    <select
                      value={isSelectedInstructor}
                      onChange={(data) =>
                        setSelectedInstructor(data.target.value)
                      }
                    >
                      <option>Select</option>
                      {isIntructor.map((data) => {
                        return (
                          <option key={data._id} value={data.instructor}>
                            {data.instructor}
                          </option>
                        );
                      })}
                    </select>
                    <div className="custom-icon">
                      <FaAngleDown color="#EDEDED" />
                    </div>
                  </div>
                </div>
                <div className="btns">
                  <div className="btn clear">Clear</div>
                  <div
                    className="btn save"
                    onClick={() => HandleSaveSchedule()}
                  >
                    Save
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-con">
            <div className="sched-title-con">
              <div className="sched-title">Section</div>
              <div className="sched-title">Subject</div>
              <div className="sched-title">Day</div>
              <div className="sched-title">Period</div>
              <div className="sched-title">Room</div>
              <div className="sched-title">Instructor</div>
              <div className="sched-title">Action</div>
            </div>
            <div className="sched-data-con">
              {isSchedule.length !== 0 ? (
                <>
                  {isSchedule.map((data) => {
                    return (
                      <div key={data._id} className="sched-data-wrap">
                        <div className="sched-data">{data.section}</div>
                        <div className="sched-data">{data.subject}</div>
                        <div className="sched-data">{data.day}</div>
                        <div className="sched-data">{data.timeslot}</div>
                        <div className="sched-data">{data.room}</div>
                        <div className="sched-data">{data.instructor}</div>
                        <div className="sched-data">
                          <div
                            className="btn"
                            onClick={() => HandleDeleteSchedule(data._id)}
                          >
                            <FaTrashAlt color="white" size={20} />
                            <span>Delete</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="no-data">NO DATA</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSchedule;
