import React from "react";
import { useFetchData } from "@/hooks/useFetchData";
interface User {
  id: string;
  name: string;
  email: string;
  // Add more columns as needed
}

const DataDisplay: React.FC = () => {
  const { data, loading, error } = useFetchData<User>("services"); // replace "users" with your table name

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data.length === 0) return <div>No data found.</div>;

  return (
    <div className="p-4">
      {data.map((item) => (
        <div key={item.id} className="border p-2 mb-2 rounded">
          <p><strong>Title:</strong> {item.title}</p>
          <p><strong>Description:</strong> {item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;

