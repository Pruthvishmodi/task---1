"use client";
import { useTableContext } from "@/contextApi/tableContext";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {};

const BarChart = (props: Props) => {
  const { checkedItems } = useTableContext();
  return (
    <div className="flex-1 flex justify-center items-center">
      {checkedItems.length ? (
        <Plot
          data={[
            {
              x: checkedItems.map((x) => x.title),
              y: checkedItems.map((x) => x.price),
              type: "bar",
            },
          ]}
          layout={{ width: 520, height: 440, title: `Products Data` }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default BarChart;
