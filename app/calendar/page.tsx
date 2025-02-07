"use client";

import AddNewJobModal from "../components/AddNewJobModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  description?: string;
}

export default function CreateEvent() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]); // Initialize state for events

  // Use useEffect to call getEvents when the component mounts or when the session changes
  useEffect(() => {
    const getEvents = async () => {
      if (session?.user.accessToken) {
        const response = await fetch("api/calendar/create-event", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`, // Use the OAuth2 token here
          },
        });
        const data = await response.json();
        console.log("data from fetch get events", data);

        const formatEvents = (events: any) => {
          const res: CalendarEvent[] = [];
          for (let calendarEvent of events) {
            res.push({
              title: calendarEvent.summary,
              start: calendarEvent.start.dateTime,
              end: calendarEvent.end.dateTime,
              description: calendarEvent.description,
            });
          }
          return res;
        };

        const formattedEvents = formatEvents(data);

        setEvents(formattedEvents); // Update the state with fetched events
      }
    };
    getEvents(); // Fetch events when component is mounted
  }, [session]); // Depend on session to re-fetch if it changes

  console.log("events console log => ", events);

  return (
    <div>
      <label className="btn btn-primary" htmlFor="modal-1">
        Add New Job
      </label>
      <input className="modal-state" id="modal-1" type="checkbox" />
      <AddNewJobModal />
      <div className="w-[80vw] h-[80vh] relative top-1/2 left-1/2 transform -translate-x-1/2 ">
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
          events={events}
          initialView="dayGridMonth"
        />
      </div>
    </div>
  );
}
