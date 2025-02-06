import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { google } from "googleapis";
import { addMinutes } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

async function getOAuthClient(accessToken: string) {
  const oAuthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );

  oAuthClient.setCredentials({
    access_token: accessToken,
  });

  return oAuthClient;
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
export async function POST(req: NextRequest) {

  const { guestName, guestEmail, startTime, durationInMinutes, eventName, guestNotes } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("User is not authenticated", { status: 401 })
  }

  try {

    const oAuthClient = await getOAuthClient(session.user.accessToken);

    // Get user's email (for adding them as an attendee)
    const calendarUser = await google.oauth2("v2").userinfo.get({ auth: oAuthClient });
    const userEmail = calendarUser.data.email;

    const calendarEvent = await google.calendar("v3").events.insert({
      calendarId: "primary",
      auth: oAuthClient,
      sendUpdates: "all",
      requestBody: {
        attendees: [
          { email: guestEmail, displayName: guestName },
          { email: userEmail, displayName: calendarUser.data.name, responseStatus: "accepted" },
        ],
        description: guestNotes ? `Additional Details: ${guestNotes}` : undefined,
        start: { dateTime: new Date(startTime).toISOString() },
        end: { dateTime: addMinutes(new Date(startTime), durationInMinutes).toISOString() },
        // summary: `${guestName} + ${calendarUser.data.name}: ${eventName}`,
        summary: `${eventName}`,
      },
    });

    return new Response(JSON.stringify(calendarEvent), { status: 200 })
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return new Response("Failed to create calendar event", { status: 500 })
  }
}
