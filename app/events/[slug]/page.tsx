import { notFound } from "next/navigation";
import Image from "next/image";
import { getEventBySlug } from "@/lib/actions/event.actions";
import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsItem = ({ icon, alt, label, value }: { icon: string, alt: string, label: string, value: string }) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Image src={icon} alt={alt} width={20} height={20} />
      <p>{label}: {value}</p>
    </div>
  )
}

// const cleanupArrayData = (data: any): string[] => {
//   let items: any[] = [];

//   // 1. Normalize input to an array
//   if (typeof data === 'string') {
//     const trimmed = data.trim();
//     if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
//       try {
//         items = JSON.parse(trimmed);
//       } catch (e) {
//         items = trimmed.split(',').map(s => s.trim());
//       }
//     } else {
//       items = [trimmed];
//     }
//   } else if (Array.isArray(data)) {
//     if (data.length === 1 && typeof data[0] === 'string') {
//       const trimmed = data[0].trim();
//       if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
//         try {
//           items = JSON.parse(trimmed);
//         } catch (e) {
//           items = trimmed.split(',').map(s => s.trim());
//         }
//       } else {
//         items = data;
//       }
//     } else {
//       items = data;
//     }
//   }

//   // 2. Aggressively clean each item
//   return items.map((item) => {
//     let cleaned = String(item).trim();

//     // Repeatedly remove leading/trailing noise: brackets, quotes, escapes
//     // We use a regex loop to handle nested cases or partial fragments
//     let prev;
//     do {
//       prev = cleaned;
//       cleaned = cleaned
//         .replace(/^[\[\]"'\s]+/, '') // Remove leading [, ], ", ', space
//         .replace(/[\[\]"'\s]+$/, '') // Remove trailing [, ], ", ', space
//         .replace(/\\"/g, '"');        // Fix escaped quotes if any
//     } while (cleaned !== prev && cleaned.length > 0);

//     return cleaned;
//   }).filter(item => item.length > 0);
// };

const EventTags = ({ tags }: { tags: string[] }) => {

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag, index) => (
        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider">
          {tag}
        </span>
      ))}
    </div>
  )
}

const EventAgenda = ({ agenda }: { agenda: string[] }) => {
  // const cleanedAgenda = cleanupArrayData(agenda);

  if (agenda.length === 0) return null;

  return (
    <div className="mt-10 bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Event Agenda</h2>
      <div className="space-y-4">
        {agenda.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-none w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1 pt-1">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`)
  const data = await request.json()
  const event = data.event
  if (!event) {
    notFound()
  }
  const similarEvents: IEvent[] = await getEventBySlug(slug)

  return (
    <section id="event">
      <h1>
        {event.title}
      </h1>
      <p className="mt-7">{event.description}</p>
      <Image src={event.image} alt={event.title} width={700} height={700} />
      <h2 className="mt-7">Overview</h2>
      <p className="mb-3">{event.overview}</p>
      <EventDetailsItem icon="/icons/calendar.svg" alt="Calendar" label="Date" value={event.date} />
      <EventDetailsItem icon="/icons/clock.svg" alt="Clock" label="Time" value={event.time} />
      <EventDetailsItem icon="/icons/pin.svg" alt="Location" label="Location" value={event.location} />
      <EventDetailsItem icon="/icons/mode.svg" alt="Mode" label="Mode" value={event.mode} />
      <EventDetailsItem icon="/icons/audience.svg" alt="Audience" label="Audience" value={event.audience} />
      <EventAgenda agenda={event.agenda} />
      <EventTags tags={event.tags} />

      {similarEvents && similarEvents.length > 0 && (
        <div className="mt-16 border-t border-gray-100 dark:border-zinc-800 pt-10">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Related Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarEvents.map((similarEvent) => (
              <a
                key={similarEvent.slug}
                href={`/events/${similarEvent.slug}`}
                className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={similarEvent.image}
                    alt={similarEvent.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium">View Details →</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {similarEvent.mode}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
                      {similarEvent.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
                    {similarEvent.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {similarEvent.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* <aside className="booking">
        <div className="signup-card">
          <h2>Book your spot</h2>
          {
            event.bookings > 0 ? (
              <p>join {event.bookings} people who have already booked their spot</p>
            ) : (
              <p>No spots available</p>
            )
          }
          <button>Book your spot</button>
        </div>
      </aside> */}
     
    </section>
  )
}

export default EventDetails