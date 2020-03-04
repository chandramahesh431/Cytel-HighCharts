import React, { Component } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Chart extends Component {
  state = {
    chartData: {
      chart: {
        type: this.props.type,
        marginBottom: 100
      },
      title: {
        text: this.props.titleName
      },
      subtitle: {
        text:
          (
            this.props.data.reduce(
              (accumulator, obj) => accumulator + obj.y,
              0
            ) / 1000
          ).toFixed(2) + " TWh",
        floating: true,
        style: {
          fontSize: 14,
          fontWeight: "bold",
          color: "#000000"
        },
        y: 170
      },
      series: [
        {
          data: this.props.data
        }
      ],
      ...this.props.userConfig
    }
  };

  changeType = type => {
    this.setState({ type: type });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        chartData: {
          ...this.state.chartData,
          subtitle: {
            text:
              (
                this.props.data.reduce(
                  (accumulator, obj) => accumulator + obj.y,
                  0
                ) / 1000
              ).toFixed(2) + " TWh"
          },
          series: [
            {
              data: this.props.data
            }
          ]
        }
      });
    }
  }

  render() {
    console.log("this.state.chartData", this.state.chartData.chart);
    return (
      <>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.chartData}
        />
      </>
    );
  }
}

export default Chart;
