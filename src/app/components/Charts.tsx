import { Column } from "@ant-design/plots";

const Chart = () => {
  const data = [
    { type: "Applied", value: 14 },
    { type: "Shortlisted", value: 5 },
    { type: "Interview", value: 2 },
    { type: "Rejected", value: 3 },
    { type: "Total views", value: 3 },
  ];

  const config = {
    data,
    xField: "type",
    yField: "value",
    columnWidthRatio: 0.2,
  };

  return(
    <div className="h-24">
<Column {...config} />
    </div>
  )
  
  
};

export default Chart;
