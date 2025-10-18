import React, { useState } from "react";
import GSTCalendar from "./GSTCalendar"; // import the previous calendar component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GSTInputProps {
  defaultGSTIN?: string;
}

const GSTCalendarWrapper: React.FC<GSTInputProps> = ({ defaultGSTIN = "" }) => {
  const [gstin, setGstin] = useState<string>(defaultGSTIN);
  const [submittedGSTIN, setSubmittedGSTIN] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedGSTIN(gstin.trim());
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          placeholder="Enter GSTIN number"
          value={gstin}
          onChange={(e) => setGstin(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Show Calendar</Button>
      </form>

      {submittedGSTIN ? (
        <GSTCalendar gstin={submittedGSTIN} />
      ) : (
        <p className="text-muted-foreground">Enter GSTIN and submit to see calendar.</p>
      )}
    </div>
  );
};

export default GSTCalendarWrapper;

