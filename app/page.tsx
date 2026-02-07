
import ExploreBtn from "@/components/ExploreBtn"
import EventCard from "@/components/EventCard"
import { events } from "@/lib/constants"

const Home = () => {
  return (
    <section>
      <h1 className="text-center mt-10">The Hub for Every Dev <br/> Event You Can't Miss</h1>
      <p className="text-center mt-5">From hackathons to conferences, we've got you covered.</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
          <h3 className="text-center">Featured Events</h3>
          <ul className="events">
            {
              events.map((event) => (
                <li key={event.title} id="event-card">
                  <EventCard {...event}/>
                </li>
              ))
            }
          </ul>
      </div>
    </section>
  )
}

export default Home
 