import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type DueDates = { GSTR1: string; GSTR3B: string };
type Reminders = { [key: string]: string[] };

interface GSTCalendarProps {
  gstin: string;
}

export default function GSTCalendar({ gstin }: GSTCalendarProps) {
  const [dueDates, setDueDates] = useState<DueDates | null>(null);
  const [reminders, setReminders] = useState<Reminders>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gstin) {
      setDueDates(null);
      setReminders({});
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://127.0.0.1:5000/api/gst/${gstin}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setDueDates(data.dueDates);
          setReminders(data.reminders);
        } else {
          setDueDates(null);
          setReminders({});
        }
      })
      .catch(() => {
        setDueDates(null);
        setReminders({});
      })
      .finally(() => setLoading(false));
  }, [gstin]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading calendar...</p>;

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const getTileClass = ({ date, view }: { date: Date; view: string }) => {
    if (!dueDates) return "";

    const gstr1 = new Date(dueDates.GSTR1);
    const gstr3b = new Date(dueDates.GSTR3B);
    const reminderDates = Object.values(reminders).flat().map((d) => new Date(d));

    if (view === "month") {
      if (isSameDate(date, gstr1) || isSameDate(date, gstr3b)) {
        return "highlight-due-date";
      }
      if (reminderDates.some((d) => isSameDate(d, date))) {
        return "highlight-reminder-date";
      }
    } else if (view === "year") {
      const dueMonths = [gstr1.getMonth(), gstr3b.getMonth()];
      if (dueMonths.includes(date.getMonth())) return "highlight-due-month";

      const reminderMonths = reminderDates.map((d) => d.getMonth());
      if (reminderMonths.includes(date.getMonth())) return "highlight-reminder-month";
    }
    return "";
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title"> GST Return Calendar</h2>
      <Calendar tileClassName={getTileClass} />
      <div className="legend">
        <span><span className="dot due"></span>Due Date / Month</span>
        <span><span className="dot reminder"></span>Reminder Date / Month</span>
      </div>
      <small style={{ color: "#6b7280", display: "block", marginTop: 8 }}>
        Click a month to view its dates. Use arrows to navigate.
      </small>

      <style>{`
        .calendar-container {
          max-width: 520px;
          margin: 50px auto;
          background: #f9fafb;
          padding: 28px;
          border-radius: 20px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          text-align: center;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }

        .calendar-container:hover {
          box-shadow: 0 8px 22px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }

        .calendar-title {
          font-size: 1.7rem;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 18px;
        }

        .react-calendar {
          border: none;
          width: 100%;
          min-height: 340px;
          background: white;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: inset 0 0 0 1px #e5e7eb;
          transition: all 0.25s ease-in-out;
        }

        .react-calendar__viewContainer {
          min-height: 300px;  /* ✅ prevents squeezed effect */
        }

        .react-calendar__tile {
          padding: 10px;
          border-radius: 8px;
          transition: all 0.25s ease;
        }

        .react-calendar__tile:hover {
          background: #e0e7ff;
          transform: scale(1.05);
        }

        .highlight-due-date, .highlight-due-month {
          background: #2563eb !important;
          color: white !important;
          border-radius: 10px;
          font-weight: 600;
        }

        .highlight-reminder-date, .highlight-reminder-month {
          background: #f59e0b !important;
          color: white !important;
          border-radius: 10px;
          font-weight: 600;
        }

        .react-calendar__navigation {
          margin-bottom: 8px;
        }

        .react-calendar__navigation button {
          color: #1e3a8a;
          font-weight: 600;
          border-radius: 8px;
          transition: 0.2s;
        }

        .react-calendar__navigation button:hover {
          background: #e0e7ff;
        }

        .legend {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 0.95rem;
          color: #334155;
          font-weight: 500;
        }

        .dot {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }

        .dot.due { background-color: #2563eb; }
        .dot.reminder { background-color: #f59e0b; }

        @media (max-width: 600px) {
          .calendar-container {
            margin: 20px;
            padding: 20px;
          }
          .calendar-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}

