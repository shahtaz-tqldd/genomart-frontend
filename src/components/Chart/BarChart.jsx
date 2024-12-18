import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ data, name }) => {
  const state = {
    series: [
      {
        name: name,
        data: data,
      },
    ],
    
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        height: 350,
        type: "bar",
        
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      colors: ['#10b981'],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
      },
       grid: {
        show: false
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
      <div className="flex justify-center text-xl font-semibold uppercase text-black/70">{name} Report</div>
    </div>
  );
};

export default BarChart;
