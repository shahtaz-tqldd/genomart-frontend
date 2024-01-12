import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { colors } from "../../assets/data/colors";

const PiChart = ({ data }) => {
  const chartData = {
    series: data?.map((d) => d?.totalProducts),
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: data?.map((d) => d?.category),
      colors: colors,
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="mb-10 flex items-center justify-center">
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={420}
        />
      </div>
    </div>
  );
};

export default PiChart;
