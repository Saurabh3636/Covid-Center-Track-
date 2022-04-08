import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function New() {
  const [states, setStates] = useState([]);
  const [stateid, setStateid] = useState([]);
  const [dist, setdist] = useState([]);
  const [selecteddist, setselecteddist] = useState([]);
  const [distpage, setdistpage] = useState(true);
  const [pinpage, setpinpage] = useState(false);
  const [changepage, setchangepage] = useState(true);
  const [searchpin, setsearchpin] = useState();
  const [databypin, setdatabypin] = useState();

  const [alldata, setalldata] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  //   let newDate = new Date();
  //   let date = newDate.getDate();
  //   let month = newDate.getMonth() + 1;
  //   let year = newDate.getFullYear();
  //   const currentdate = `${date}-${month}-${year}`;

  const startdate = moment();
  const [currentdate, setCurrentdate] = useState(
    startdate.format("DD/MM/YYYY")
  );
  const [nextdate1, setNextdate1] = useState(
    startdate.add(1, "days").format("DD/MM/YYYY")
  );
  const [nextdate2, setNextdate2] = useState(
    startdate.add(1, "days").format("DD/MM/YYYY")
  );
  console.log(currentdate);
  console.log(nextdate1);
  console.log(nextdate2);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.covid19api.com/summary");
      const json = await res.json();
      setStates(json.states);
    };
    fetchData();
  }, []);
  console.log(states);

  useEffect(() => {
    console.log(stateid);
    const fetchData = async () => {
      const res = await fetch(`http://api.covid19api.com/${stateid}.json`);
      const json = await res.json();
      setdist(json.districts);
    };
    fetchData();
  }, [stateid]);
  let b = stateid;
  console.log(dist);

  let a = states;
  console.log(a);
  const sayHello = () => {
    // const fetchData = async () => {
    //   const res = await fetch(
    //     `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selecteddist}&date=${currentdate}`
    //   );
    //   const json = await res.json();
    //   setalldata(json.sessions);
    // };
    // fetchData();
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selecteddist}&date=${currentdate}`
      )
      .then((response) => {
        setalldata(response.data.sessions);
      });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selecteddist}&date=${nextdate1}`
      )
      .then((response) => {
        setData2(response.data.sessions);
      });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selecteddist}&date=${nextdate2}`
      )
      .then((response) => {
        setData3(response.data.sessions);
      });
  };
  console.log(alldata);
  console.log("data2", data2);
  console.log("data3", data3);

  const [cnt, setCnt] = useState(false);
  //////////////////////search function
  const search = () => {
    setCnt(true);
    // const fetchData = async () => {
    //   const res = await fetch(
    //     `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchpin}&//date=${currentdate}`
    //   );
    //   const json = await res.json();
    //   setalldata(json.sessions);
    // };
    // fetchData();
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchpin}&date=${currentdate}`
      )
      .then((response) => {
        setalldata(response.data.sessions);
      });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchpin}&date=${nextdate1}`
      )
      .then((response) => {
        setData2(response.data.sessions);
      });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchpin}&date=${nextdate2}`
      )
      .then((response) => {
        setData3(response.data.sessions);
      });
  };
  console.log("alldata", alldata);
  const selectdistpage = () => {
    setdistpage(true);
    setpinpage(false);
    setchangepage(true);
  };
  const selectpinpage = () => {
    setdistpage(false);
    setpinpage(true);
    setchangepage(false);
  };

  useEffect(() => {
    if (cnt === false) {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selecteddist}&date=${currentdate}`
        )
        .then((response) => {
          setalldata(response.data.sessions);
        });
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selecteddist}&date=${nextdate1}`
        )
        .then((response) => {
          setData2(response.data.sessions);
        });
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selecteddist}&date=${nextdate2}`
        )
        .then((response) => {
          setData3(response.data.sessions);
        });
    } else {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchpin}&date=${currentdate}`
        )
        .then((response) => {
          setalldata(response.data.sessions);
        });
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchpin}&date=${nextdate1}`
        )
        .then((response) => {
          setData2(response.data.sessions);
        });
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchpin}&date=${nextdate2}`
        )
        .then((response) => {
          setData3(response.data.sessions);
        });
    }
  }, [currentdate, nextdate1, nextdate2]);
  const next = () => {
    let x = moment(currentdate, "DD/MM/YYYY")
      .add(3, "days")
      .format("DD/MM/YYYY");
    setCurrentdate(x);
    let y = moment(nextdate1, "DD/MM/YYYY").add(3, "days").format("DD/MM/YYYY");
    setNextdate1(y);
    let z = moment(nextdate2, "DD/MM/YYYY").add(3, "days").format("DD/MM/YYYY");
    setNextdate2(z);
  };
  return (
    <div className="container my-5">
      <h3 className="text-center mb-5">
        Search Your Nearest Vaccination Center
      </h3>
      <div className="w-50 mx-auto">
        <div className="mt-4 mb-5">
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item">
              <button
                id="find_by_dist_anchor"
                className={`nav-link ${distpage ? "active" : ""}`}
                aria-current="page"
                href="javascript:;"
                onClick={() => {
                  selectdistpage();
                }}
              >
                Find by District
              </button>
            </li>
            <li className="nav-item">
              <button
                id="find_by_pin_anchor"
                className={`nav-link ${pinpage ? "active" : ""}`}
                //href="javascript:;"
                onClick={() => {
                  selectpinpage();
                }}
              >
                Find by PIN
              </button>
            </li>
          </ul>
        </div>
        {changepage ? (
          <div className="row" id="find_by_dist">
            <div className="col">
              <div className="form-group">
                {/* <select className="" id="" className="form-control">
                <option value="">Select State</option> */}
                <select
                  className=""
                  id=""
                  className="form-control"
                  onClick={(e) => setStateid(e.target.value)}
                >
                  <option value="" selected>
                    Select state
                  </option>
                  {states &&
                    states.map((val, i) => (
                      <option key={i} value={val.state_id}>
                        {val.state_name}
                      </option>
                    ))}
                </select>
                {/* </select> */}
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                {/* <select className="" id="" className="form-control">
                <option value="">Select State</option> */}
                <select
                  className=""
                  id=""
                  className="form-control"
                  onClick={(e) => setselecteddist(e.target.value)}
                >
                  <option value="" selected>
                    Select state
                  </option>
                  {dist &&
                    dist.map((val, i) => (
                      <option key={i} value={val.district_id}>
                        {val.district_name}
                      </option>
                    ))}
                </select>
                {/* </select> */}
              </div>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-info"
                onClick={() => {
                  sayHello();
                }}
              >
                Search
              </button>
            </div>
          </div>
        ) : (
          <div className="row " id="find_by_pin">
            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter your PIN"
                  className="form-control"
                  onChange={(e) => setsearchpin(e.target.value)}
                />
              </div>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-info"
                onClick={() => {
                  search();
                }}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-12 mt-5">
          <h6>Slot Search Results ({alldata.length} Center(s) Found)</h6>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-3 text-end pt-2">
              <a
                href="javascript:;"
                className="text-decoration-none text-secondary"
              >
                <h2>&#x3008;</h2>
              </a>
            </div>
            <div className="col">
              <div className="card my-2">
                <div className="card-body py-1 my-1">
                  <strong>
                    <small>{currentdate}</small>
                  </strong>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card my-2">
                <div className="card-body py-1 my-1">
                  <strong>
                    <small>{nextdate1}</small>
                  </strong>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card my-2">
                <div className="card-body py-1 my-1">
                  <strong>
                    <small>{nextdate2}</small>
                  </strong>
                </div>
              </div>
            </div>

            <div class="col-auto pt-2">
              <a
                href="javascript:;"
                class="text-decoration-none text-secondary"
                onClick={() => next()}
              >
                <h2>&#12297;</h2>
              </a>
            </div>
          </div>
        </div>
        <div class="card-body">
          {alldata &&
            alldata.map((val, i) => (
              // <div class="text-primary" key={i}>
              //   {val.name}
              // </div>
              <div class="row py-3 border-bottom">
                <div class="col-3">
                  <div class="text-primary">{val.name}</div>
                  <div class="text-muted">
                    <small>
                      {val.address}
                      {val.block_name}
                      {val.district_name}
                      {val.state_name}
                      {val.pincode}
                    </small>
                  </div>
                  <div>
                    <span class="me-1">{val.vaccine}</span>
                    <span class="badge bg-success">{val.fee_type}</span>
                  </div>
                  <small class="d-block">
                    <span class="text-primary me-3">
                      Age: {val.min_age_limit} & Above
                    </span>
                    <span>
                      Dose:#
                      {val.available_capacity_dose1 === 0 &&
                      val.available_capacity_dose2 >= 1
                        ? "2"
                        : val.available_capacity_dose1 >= 1 &&
                          val.available_capacity_dose2 === 0
                        ? "1"
                        : "precation"}
                    </span>
                  </small>
                </div>

                <div class="col">
                  <div class="card h-100">
                    <div class="card-body d-table">
                      <div class="d-table-cell h-100 align-middle text-center">
                        <strong class="text-success">
                          {val.available_capacity} Slots
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <div class="card-body d-table">
                      <div class="d-table-cell h-100 align-middle text-center">
                        <strong class="text-success">
                          {data2 &&
                          data2.find(
                            (element) => element.center_id === val.center_id
                          )
                            ? (
                                data2 &&
                                data2.find(
                                  (element) =>
                                    element.center_id === val.center_id
                                )
                              ).available_capacity
                            : "NA"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <div class="card-body d-table">
                      <div class="d-table-cell h-100 align-middle text-center">
                        <strong class="text-success">
                          {data3 &&
                          data3.find(
                            (element) => element.center_id == val.center_id
                          )
                            ? (
                                data3 &&
                                data3.find(
                                  (element) =>
                                    element.center_id === val.center_id
                                )
                              ).available_capacity
                            : "NA"}{" "}
                          Slots
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div class="col-auto">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}

export default New;
