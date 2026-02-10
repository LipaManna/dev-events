import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";

/**
 * GET /api/events/[slug]
 * Fetches a single event by its unique slug.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await params as per Next.js 15+ dynamic route requirements
    const { slug: rawSlug } = await params;

    // Sanitize slug: trim and allow only alphanumeric characters and hyphens
    const slug = rawSlug?.trim().toLowerCase().replace(/[^\w-]/g, "");

    // Validate sanitized slug presence
    if (!slug) {
      return NextResponse.json(
        { message: "A valid slug parameter is required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: "Event details successfully fetched",
        event,
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error(`Error fetching event by slug:`, error);

    // Differentiate between known database/validation errors and unexpected server errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { 
        message: "Failed to fetch event details", 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}
