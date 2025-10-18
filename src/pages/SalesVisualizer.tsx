import React, { useState } from "react";
import Plot from "react-plotly.js";
import { DateTime } from "luxon";
import Header from "@/components/Header";

interface SalesData {
  date: string;
  dcus: number;
  sales: number;
}

const SalesVisualizer: React.FC = () => {
  const [date, setDate] = useState<string>(DateTime.now().toISODate());
  const [dcus, setDcus] = useState<number>(0);
  const [sales, setSales] = useState<number>(0);

  const sampledata = [
  { date: "2025-01-01", dcus: 120, sales: 4500 },
  { date: "2025-01-02", dcus: 130, sales: 4800 },
  { date: "2025-01-03", dcus: 125, sales: 4700 },
  { date: "2025-01-04", dcus: 140, sales: 5200 },
  { date: "2025-01-05", dcus: 135, sales: 5100 },
  { date: "2025-01-06", dcus: 150, sales: 5600 },
  { date: "2025-01-07", dcus: 145, sales: 5400 },
  { date: "2025-01-08", dcus: 138, sales: 5300 },
  { date: "2025-01-09", dcus: 155, sales: 5800 },
  { date: "2025-01-10", dcus: 160, sales: 6000 },
  { date: "2025-01-11", dcus: 148, sales: 5700 },
  { date: "2025-01-12", dcus: 135, sales: 5200 },
  { date: "2025-01-13", dcus: 142, sales: 5400 },
  { date: "2025-01-14", dcus: 150, sales: 5600 },
  { date: "2025-01-15", dcus: 158, sales: 5900 },
  { date: "2025-01-16", dcus: 162, sales: 6100 },
  { date: "2025-01-17", dcus: 155, sales: 5900 },
  { date: "2025-01-18", dcus: 140, sales: 5500 },
  { date: "2025-01-19", dcus: 132, sales: 5200 },
  { date: "2025-01-20", dcus: 145, sales: 5600 },
];



  const [dataPoints, setDataPoints] = useState<SalesData[]>(sampledata);

  const handleAddData = () => {
    if (!date || dcus === null || sales === null) return;
    const newPoint: SalesData = { date, dcus, sales };
    setDataPoints((prev) => [...prev, newPoint]);
    setDcus(0);
    setSales(0);
    setDate(DateTime.now().toISODate());
  };

  const handleRemove = (index: number) => {
    setDataPoints((prev) => prev.filter((_, i) => i !== index));
  };

  return (
  
    <div className="min-h-screen bg-background">
    <Header />
    <div className="mt-16 max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Sales Visualizer</h2>

      {/* Input Form Card */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Dcus</label>
          <input
            type="number"
            value={dcus}
            onChange={(e) => setDcus(parseFloat(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Sales</label>
          <input
            type="number"
            value={sales}
            onChange={(e) => setSales(parseFloat(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleAddData}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full shadow-md transition-colors"
          >
            Add Row
          </button>
        </div>
      </div>

      {/* Data Table */}
      {dataPoints.length > 0 && (
        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Dcus</th>
                <th className="px-4 py-2">Sales</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataPoints.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white hover:bg-gray-200"}
                >
                  <td className="px-4 py-2 text-center">{row.date}</td>
                  <td className="px-4 py-2 text-center">{row.dcus}</td>
                  <td className="px-4 py-2 text-center">{row.sales}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Plotly Chart */}
      {dataPoints.length > 0 && (
        <Plot
          data={[
            {
              x: dataPoints.map((d) => d.date),
              y: dataPoints.map((d) => d.dcus),
              type: "scatter",
              mode: "lines+markers",
              name: "Dcus",
              line: { color: "#2563eb" }, // blue-600
              marker: { size: 6 },
            },
            {
              x: dataPoints.map((d) => d.date),
              y: dataPoints.map((d) => d.sales),
              type: "scatter",
              mode: "lines+markers",
              name: "Sales",
              line: { color: "#f97316" }, // orange-500
              marker: { size: 6 },
            },
          ]}
          layout={{
            title: "Sales Analysis",
            xaxis: { title: "Date", type: "date", rangeslider: { visible: true } },
            yaxis: { title: "Value", autorange: true },
            hovermode: "x unified",
            template: "plotly_dark",
          }}
          style={{ width: "100%", height: "500px", borderRadius: "12px" }}
        />
      )}
      </div>
    </div>
  );
};

export default SalesVisualizer;

