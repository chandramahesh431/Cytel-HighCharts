import React, { Component } from "react";
import "./App.css";
import template from "./components/template";
import Selection from "./components/Selection";
import Dashboard from "./components/Dashboard.jsx";
import dataProcessing, {
  fossilFuelData,
  hydroElectricData,
  renewableEnergyData,
  biomassData
} from "./components/dataProcessing";
const types = ["pie", "line", "bar", "area", "areaspline", "column", "spline"];

class App extends Component {
  //state = template;
  state = {
    userConfig: {
      tooltip: {
        pointFormat: "<b>{point.y} thousand megawatthours</b>"
      },
      plotOptions: {
        pie: {
          showInLegend: true,
          innerSize: "60%",
          dataLabels: {
            enabled: false,
            distance: -14,
            color: "white",
            style: {
              fontweight: "bold",
              fontsize: 50
            }
          }
        }
      }
    },
    yearFrom: "2001",
    yearTo: "2015",
    msg: "Select the range",
    type: "pie"
  };

  copyDataSeries = (obj = {}) => {
    console.log("obj", obj);
    this.setState({
      ...obj,

      charts: [
        { serie: fossilFuelData, title: "Fossil Fuel" },
        {
          serie: hydroElectricData,
          title: "Hydroelectric Energy"
        },
        { serie: renewableEnergyData, title: "Biomass" },
        { serie: biomassData, title: "Renewable Energy" }
      ]
    });
  };
  componentDidMount() {
    dataProcessing(this.state.yearFrom, this.state.yearTo, this.state.msg);
    this.copyDataSeries();
  }

  handleSubmit = e => {
    let msg = dataProcessing(this.state.yearFrom, this.state.yearTo);
    this.copyDataSeries({ msg: msg });
    e.preventDefault();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.yearFrom !== this.state.yearFrom) {
      this.handleChangeSelect();
    }
    if (prevState.yearTo !== this.state.yearTo) {
      this.handleChangeSelect();
    }
    if (prevState.type !== this.state.type) {
      this.handleChangeSelect();
    }
  }
  handleChangeSelect() {
    let msg = dataProcessing(
      this.state.yearFrom,
      this.state.yearTo,
      this.state.type
    );
    this.copyDataSeries({ msg: msg });
  }

  handleChangeYear = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChangeType = e => {
    this.setState({ [e.target.name]: e.target.value });
    // this.copyDataSeries();
  };
  render() {
    // alert(this.state.type);
    return (
      <>
        <div className="container bg-light">
          <h1 className="text-center mt-5">Cytel</h1>
        </div>
        <div className="container  mb-5 pb-3 bg-light">
          <div
            className={
              "text-center mb-0 pt-3 bold " +
              (this.state.msg !== "Select the range" ? "text-danger" : "")
            }
          >
            <strong>{this.state.msg}</strong>
          </div>
          <Selection
            yearFrom={this.state.yearFrom}
            yearTo={this.state.yearTo}
            type={this.state.type}
            onChangeYear={this.handleChangeYear}
            onSubmit={this.handleSubmit}
          />
          {/* <label className="m-1">Chart Type</label>
          <select
            className="listbox-area m-1 "
            name="type"
            value={this.state.type}
            onChange={this.handleChangeType}
          >
            {types.map(y => {
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>{" "}
          - {this.state.type} */}
          <Dashboard
            userConfig={this.state.userConfig}
            charts={this.state.charts}
            type={this.state.type}
          />
        </div>
      </>
    );
  }
}

export default App;
