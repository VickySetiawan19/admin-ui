import { BarChart } from '@mui/x-charts/BarChart'; 
import * as React from "react";
import { ThemeContext } from "../../context/themeContext";

const chartSetting = {
  height: 300,
  yAxis: [
    {
      disableTicks: true,
      disableLine: true,
      width: 50,
    },
  ],
  grid: {
    horizontal: true,
  },
  sx: {
    ["& .MuiChartsAxis-left .MuiChartsAxis-tickLabel"]: {
      fill: "#9F9F9F",
    },
    ["& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel"]: {
      fill: "#9F9F9F",
    },
  },
};

export function valueFormatter(value) {
  return `${value}mm`;
}

export default function BarsDataset(props) {
  const { dataset } = props;
  const { theme } = React.useContext(ThemeContext);

  const expensesSeries = dataset.series.map((item) =>
    item.datakey === "amountLastWeek" ? {...item, color: theme.color} : item
);

  return (
    <BarChart
      dataset={dataset.data}
      xAxis={[{ dataKey: dataset.dataKey, categoryGapRatio: 0.5 }]}
      series={expensesSeries}
      {...chartSetting}
    />
  );
}