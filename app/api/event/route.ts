import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";

/**
 * Safely parse JSON array coming from FormData or fallback to CSV
 */
const safeJsonArray = (value: FormDataEntryValue | null): string[] => {
  if (!value || typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map(v => String(v).trim()).filter(Boolean);
    }
  } catch {
    // fallback: comma-separated string
  }

  return value
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    let eventData: any = {};

    /**
     * -------------------------------
     * MULTIPART / FORM-DATA REQUEST
     * -------------------------------
     */
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      eventData = {
        title: formData.get("title"),
        description: formData.get("description"),
        overview: formData.get("overview"),
        venue: formData.get("venue"),
        location: formData.get("location"),
        date: formData.get("date"),
        time: formData.get("time"),
        mode: formData.get("mode"),
        audience: formData.get("audience"),
        organizer: formData.get("organizer"),
        agenda: safeJsonArray(formData.get("agenda")),
        tags: safeJsonArray(formData.get("tags")),
      };

      /**
       * IMAGE UPLOAD (Cloudinary)
       */
      const file = formData.get("image") as File | null;

      if (!file || file.size === 0) {
        return NextResponse.json(
          { message: "Image is required" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "events", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      eventData.image = uploadResult.secure_url;
    }
    

    /**
     * -------------------------------
     * JSON REQUEST
     * -------------------------------
     */
    else {
      eventData = await req.json();

      if (typeof eventData.agenda === "string") {
        eventData.agenda = JSON.parse(eventData.agenda);
      }

      if (typeof eventData.tags === "string") {
        eventData.tags = JSON.parse(eventData.tags);
      }

      if (!eventData.image) {
        return NextResponse.json(
          { message: "Image is required" },
          { status: 400 }
        );
      }
    }

    /**
     * -------------------------------
     * CREATE EVENT
     * -------------------------------
     */

    const createdEvent = await Event.create(eventData);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (e: any) {
    console.error("Event creation error:", e);

    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    if (e.code === 11000) {
      return NextResponse.json(
        { message: "Event with this title/slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Event creation failed",
        error: e.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Event list successfully fetched", events },
      { status: 200 }
    );
  } catch (error) {
    console.error("Event fetch error:", error);
    return NextResponse.json(
      { message: "Event fetch failed", error },
      { status: 500 }
    );
  }
}
