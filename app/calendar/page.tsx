"use client";

import { useSession } from "next-auth/react";

export default function CreateEvent() {
  const { data: session } = useSession();

  const handleCreateEvent = async () => {
    if (!session) {
      alert("You must be logged in to create an event.");
      return;
    }

    const response = await fetch("/api/calendar/create-event", {
      method: "POST",
      body: JSON.stringify({
        guestName: "Bao Zhang",
        guestEmail: "bzhang50167@gmail.com",
        // guestName: "",
        // guestEmail: "office.topgradetermite@gmail.com",
        startTime: new Date(),
        durationInMinutes: 60,
        eventName: "Meeting",
        guestNotes: "Important meeting",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Event created successfully:", data);
    } else {
      console.error("Failed to create event:", data.error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateEvent}>Create Google Calendar Event</button>
    </div>
  );
}
