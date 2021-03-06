import React, { useState } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  Popover,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Dropdown, DropdownMenu, DropdownToggle
} from "reactstrap";
import Layout from "layouts";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import Header from "components/Header";
import { getMetricData } from "components/Header"

const getQueryParams = () => {
  let urlString = document.URL;
  if (urlString && urlString.includes('?')) {
    //console.log(urlString.split('?'))
    let paramString = urlString.split('?')[1];
    let queryString = paramString.split('&');
    const params = {
      id: (queryString[0]).replace("compare1=", ""),
      //date: (queryString[1]).replace("date=", ""),
      selectedRange: queryString[1].replace("compare2=", "")
    };
    return params;
  }

  return {
    compare1: "ios",
    compare2: 'android'
  }
}

const CompareDashboard = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const metricData = {
    "id": 4,
    "date": "2020-11-25",
    "framerate": 3894,
    "bitrate": 5078,
    "concurrentplay": 7369,
    "rebuffering": 44.54,
    "plays": 2522,
    "uniquedevice": 1877,
    "endedplay": 741,
    "attempts": 4005,
    "range": "1"
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  };
  const toggleNav = (index) => {
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1",);
  };

  const ranges = {
    1: "Today",
    2: "Yesterday",
    3: "This week",
    4: "This month"
  };

  console.log(metricData, 'metricData')
  const range = metricData ? metricData.range : null;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(range)
  const [selectedDropdownVal, setDropDownVal] = useState(range);
  const toggle = (id) => {
    setDropDownVal(id)
    setDropdownOpen(prevState => !prevState)
  };
  const compareItems = getQueryParams();
  console.log(selectedDropdownVal, 'selectedDropdownVal')
  return (
    <React.Fragment>
      <div className="d-md-flex pb-4 pt-5 pt-md-7">
        <div className="container-fluid d-flex justify-content-between">
          <div style={{ cursor: "pointer", background: "#5e72e4", padding: "10px", color: "white", borderRadius: "10px", width: "150px", height: "50px", textAlign: "center" }}>
            <Dropdown isOpen={dropdownOpen} toggle={() => toggle(null)}>
              <DropdownToggle
                caret
                style={{ cursor: "pointer" }}
                tag="span"
                data-toggle="dropdown"
                aria-expanded={dropdownOpen}
              >
                {(dropdownOpen || !selectedDropdownVal) ? "Select range" : ranges[selectedDropdownVal]}
              </DropdownToggle>
              <DropdownMenu >
                <div style={{ padding: "8px", textAlign: "center", cursor: "pointer" }} onClick={() => toggle(1)}>Today</div>
                <div style={{ padding: "8px", textAlign: "center", cursor: "pointer" }} onClick={() => toggle(2)}>Yesterday</div>
                <div style={{ padding: "8px", textAlign: "center", cursor: "pointer" }} onClick={() => toggle(3)}>This week</div>
                <div style={{ padding: "8px", textAlign: "center", cursor: "pointer" }} onClick={() => toggle(4)}>This month</div>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className=".col-sm-12 .col-md-12 .offset-md-5">
            <div style={{ fontSize: "32px", fontWeight: "bold" }}>{"Comparing" + " " + compareItems.compare1 + " and " + compareItems.compare2}</div>
          </div>
          <div>
            <h2>CompareDashboard</h2>
          </div>
        </div>
      </div>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid id="puppeteer">
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                      </h6>
                    <h2 className="mb-0">Attempts</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNav(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNav(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                      </h6>
                    <h2 className="mb-0">Plays</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">/</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">/</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">/</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">/</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

CompareDashboard.layout = Layout;

export default CompareDashboard;
