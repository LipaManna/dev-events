'use server';

import connectDB from "../mongodb";
import Event from "@/database/event.model";

export async function getEventBySlug(slug: string) {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        return await Event.find({_id: {$ne: event?._id}, tags: {$in: event?.tags}})
    } catch (error) {
        console.error("Event fetch error:", error);
        return [];
    }
}