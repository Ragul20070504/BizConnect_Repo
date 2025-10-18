import React from "react";
import DataDisplay from "./DataDisplay";

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Data</h1>
      <DataDisplay />
    </div>
  );
};

export default App;

