import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaAngleDown } from "react-icons/fa";
import Api from "./api.json";

const Section = () => {
  const API = `${Api.api}/api/section`;
  const CourseAPI = `${Api.api}/api/course`;
  const YearAPI = `${Api.api}/api/year`;
  const SemesterAPI = `${Api.api}/api/semester`;

  const [isData, setData] = useState([]);
  const [isCourse, setCourse] = useState([]);
  const [isYear, setYear] = useState([]);
  const [isSemester, setSemester] = useState([]);
  const [isCurrentPage, setCurrentPage] = useState(1);
  const isPostPerPage = 8;
  const [isID, setID] = useState("");
  const [isJumpTo, setJumpTo] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [isVisibleUpdate, setVisibleUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isRoom, setRoom] = useState("");
  const [isError, setError] = useState(false);
  const [isErroru, setErroru] = useState(false);
  const [isSelect, setSelected] = useState("");
  const [isSelectYear, setSelectedYear] = useState("");
  const [isSelectSemester, setSelectedSemester] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [isDisabledYear, setDisabledYear] = useState(true);
  const pageNumbers = [];

  const [isGetCourse, setGetCourse] = useState("");
  const [isGetYear, setGetYear] = useState("");
  const [isGetSemester, setGetSemester] = useState("");

  const UpdateData = async () => {
    const GetRequest = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };

    await fetch(API, GetRequest)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const GetRequest = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };

    (async () => {
      await fetch(YearAPI, GetRequest)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch the data");
          }
          return response.json();
        })
        .then((result) => setYear(result))
        .catch((error) => console.log("error", error));
    })();

    (async () => {
      await fetch(API, GetRequest)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch the data");
          }
          return response.json();
        })
        .then((result) => setData(result))
        .catch((error) => console.log("error", error));
    })();

    (async () => {
      await fetch(CourseAPI, GetRequest)
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
      await fetch(SemesterAPI, GetRequest)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch the data");
          }
          return response.json();
        })
        .then((result) => setSemester(result))
        .catch((error) => console.log("error", error));
    })();
  }, [API, CourseAPI, YearAPI, SemesterAPI]);

  const indexOfLastData = isCurrentPage * isPostPerPage;
  const indexOfFirstData = indexOfLastData - isPostPerPage;
  const currentData = isData.slice(indexOfFirstData, indexOfLastData);

  for (
    let index = 1;
    index <= Math.ceil(isData.length / isPostPerPage);
    index++
  ) {
    pageNumbers.push(index);
  }

  const paginate = (pageNumber) => {
    if (pageNumber <= 0) return;
    if (pageNumber >= pageNumbers.length + 1) return;
    setCurrentPage(pageNumber);
  };

  const goPaginate = (pageNumber) => {
    if (pageNumber !== "") {
      setCurrentPage(isJumpTo);
      setJumpTo("");
    }
  };

  const HandleDelete = async (id) => {
    setID(id);
    setVisible(true);
  };

  const HandleConfirm = async () => {
    const raw = JSON.stringify({
      _id: isID,
    });

    const RequestDelete = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    await fetch(API, RequestDelete)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((result) => {
        if (result.message === "OK") {
          UpdateData();
          setVisible(false);
        }
      })
      .catch((error) => console.log("error", error));
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

  const HandleModalUpdate = () => {
    const [isRoomUpdate, setRoomUpdate] = useState("");
    return (
      <div className="room-modal">
        <div className="modal-wrap">
          <div className="title">Update</div>
          <div className="modal-desc">
            <div className="mod-wrap">
              <div className="titled">Section</div>
              <input
                type="text"
                placeholder="Section"
                value={isRoomUpdate}
                onChange={(data) => setRoomUpdate(data.target.value)}
              />
            </div>
            {isErroru ? (
              <div className="error">Don't leave this blank before saving</div>
            ) : undefined}
          </div>
          <div className="btns">
            <div
              className="btn yes"
              onClick={() => HandleConfirmUpdate(isRoomUpdate)}
            >
              Yes
            </div>
            <div
              className="btn cancel"
              onClick={() => {
                setVisibleUpdate(false);
                setErroru(false);
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HandleUpdate = (id) => {
    setID(id);
    setVisibleUpdate(true);
  };

  const HandleConfirmUpdate = (isRoomUpdate) => {
    if (!isRoomUpdate) return setErroru(true);
    setErroru(false);

    const raw = JSON.stringify({
      _id: isID,
      section: isRoomUpdate,
    });

    const PatchRequest = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    fetch(API, PatchRequest)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((result) => {
        if (result.message === "OK") {
          UpdateData();
          setVisibleUpdate(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const HandleClear = () => {
    setRoom("");
  };

  const HandleSaveRoom = async () => {
    if (!isRoom) return setError(true);
    setError(false);

    setLoading(true);
    const raw = JSON.stringify({
      section: isRoom,
      semester: isGetSemester,
      course: isGetCourse,
      year: isGetYear,
    });

    const PostRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    await fetch(API, PostRequest)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        // if (result.message === "OK") {
        //   UpdateData();
        //   setRoom("");
        //   setLoading(false);
        // }
      })
      .catch((error) => console.log("error", error));
  };

  const HandleSelectedValue = (data) => {
    if (data === "Select")
      return (
        setDisabledYear(true),
        setError(false),
        setSelected(""),
        setSelectedYear("")
      );

    setDisabledYear(false);
    setError(false);
    setSelected(data);
  };

  const HandleSelectedValueYear = (data) => {
    if (data === "Select") {
      setDisabled(true);
      setError(false);
      setSelectedYear("");
    }

    setError(false);
    setSelectedYear(data);
  };

  const HandleSelectedValueSemester = (data) => {
    if (data === "Select") {
      setDisabled(true);
      setError(false);
      setSelectedSemester("");
    }

    setDisabled(false);
    setError(false);
    setSelectedSemester(data);
  };

  const HandleGetProgram = (data) => {
    setGetCourse(data);
  };

  const HandleGetYear = (data) => {
    setGetYear(data);
  };

  const HandleGeSemester = (data) => {
    setGetSemester(data);
  };

  return (
    <>
      {isVisible ? <HandleModalDelete /> : undefined}
      {isVisibleUpdate ? <HandleModalUpdate /> : undefined}
      {isLoading ? <div className="Loading" /> : undefined}
      <div className="mg-con">
        <div className="con-left">
          <div className="t-itle">Course</div>
          <div className="top-wrap">
            <div className="selection">
              <div className="custom-select">
                <select
                  value={isSelect}
                  onChange={(data) => HandleSelectedValue(data.target.value)}
                >
                  <option>Select</option>
                  {isCourse.map((data) => {
                    return (
                      <option
                        key={data._id}
                        value={data._id}
                        onClick={() => HandleGetProgram(data.course)}
                      >
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
          </div>
          <div className={`t-itle ${isDisabledYear ? "disabled" : undefined}`}>
            Year
          </div>
          <div
            className={`top-wrap ${isDisabledYear ? "disabled" : undefined}`}
          >
            <div className="selection">
              <div className="custom-select">
                <select
                  value={isSelectYear}
                  onChange={(data) =>
                    HandleSelectedValueYear(data.target.value)
                  }
                >
                  <option>Select</option>
                  {isYear.map((data) => {
                    return (
                      <option
                        key={data._id}
                        value={data._id}
                        onClick={() => HandleGetYear(data.year)}
                      >
                        {data.year}
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
          <div className={`t-itle ${isDisabledYear ? "disabled" : undefined}`}>
            Semester
          </div>
          <div
            className={`top-wrap ${isDisabledYear ? "disabled" : undefined}`}
          >
            <div className="selection">
              <div className="custom-select">
                <select
                  value={isSelectSemester}
                  onChange={(data) =>
                    HandleSelectedValueSemester(data.target.value)
                  }
                >
                  <option>Select</option>
                  {isSemester.map((data) => {
                    return (
                      <option
                        key={data._id}
                        value={data._id}
                        onClick={() => HandleGeSemester(data.semester)}
                      >
                        {data.semester}
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
          <div className={`bot-wrap ${isDisabled ? "disabled" : undefined}`}>
            <div className="t-itle">Section</div>
            <div className="wrapper">
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Section"
                  value={isRoom}
                  onChange={(data) => setRoom(data.target.value)}
                />
                {isError ? (
                  <div className="error">
                    Don't leave this blank before saving
                  </div>
                ) : undefined}
                <div className="bns">
                  <div className="btn clear" onClick={() => HandleClear()}>
                    Clear
                  </div>
                  <div className="btn add" onClick={() => HandleSaveRoom()}>
                    Save
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="con-right">
          <div className="title">
            <div>Section</div>
            <div>Action</div>
          </div>
          <div className="table">
            <div className="table-con-data">
              {isData.length !== 0 ? (
                <>
                  {currentData.map((data, index) => {
                    return (
                      <div key={index} className="table-data">
                        <div className="room-name">{data.section}</div>
                        <div className="action">
                          <div
                            className="del"
                            onClick={() => HandleDelete(data._id)}
                          >
                            <FaTrashAlt color="white" size={17} />
                            <span>Delete</span>
                          </div>
                          <div
                            className="upd"
                            onClick={() => HandleUpdate(data._id)}
                          >
                            <FaEdit color="white" size={17} />
                            <span>Update</span>
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
            <div className="pagination">
              <div
                className="btn-prev"
                onClick={() => paginate(isCurrentPage - 1)}
              >
                Previous
              </div>
              <span className="page">page</span>
              <div className="counter-display">
                <input
                  type="text"
                  value={isJumpTo}
                  onChange={(data) => setJumpTo(data.target.value)}
                  placeholder={`${isCurrentPage}`}
                />
                <div className="btn-go" onClick={() => goPaginate(isJumpTo)}>
                  Go
                </div>
              </div>
              <span className="total-page">{`of ${pageNumbers.length}`}</span>
              <div
                className="btn-next"
                onClick={() => paginate(isCurrentPage + 1)}
              >
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
