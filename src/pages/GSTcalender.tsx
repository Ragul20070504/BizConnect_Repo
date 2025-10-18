import React, { useState } from "react";
import GSTCalendar from "./Calender"; // your existing calendar component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { AlertCircle } from "lucide-react";

interface GSTInputProps {
  defaultGSTIN?: string;
}

const GSTCalendarWrapper: React.FC<GSTInputProps> = ({ defaultGSTIN = "" }) => {
  const [gstin, setGstin] = useState<string>(defaultGSTIN);
  const [submittedGSTIN, setSubmittedGSTIN] = useState<string>("");
  const [error, setError] = useState<string>("");

  // GSTIN validation regex (15 characters: 2 digits + 10 PAN chars + 1 entity code + 1 blank Z + 1 checksum)
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = gstin.trim().toUpperCase();

    if (!gstinRegex.test(trimmed)) {
      setError("Invalid GSTIN format. Please enter a valid 15-character GSTIN.");
      setSubmittedGSTIN("");
      return;
    }

    setError("");
    setSubmittedGSTIN(trimmed);
  };

  return (
    <div>
      <Header />
      <div className="p-6">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <Input
            placeholder="Enter GSTIN number"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
            className={`flex-1 ${error ? "border-red-500" : ""}`}
          />
          <Button type="submit">Show Calendar</Button>
        </form>

        {error && (
          <div className="flex items-center text-red-500 gap-2 mb-2">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {submittedGSTIN ? (
          <GSTCalendar gstin={submittedGSTIN} />
        ) : (
          <p className="text-muted-foreground">
            Enter a valid GSTIN and submit to see the calendar.
          </p>
        )}
      </div>
    </div>
  );
};

export default GSTCalendarWrapper;

