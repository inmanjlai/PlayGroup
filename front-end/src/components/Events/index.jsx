import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEntireDatabase } from "../../store/db"
import './Events.css'

const Events = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEntireDatabase())
    }, [])
    
    const allEvents = [];
    const events = useSelector((state) => state.db.events);

    for (const key in events) {
        allEvents.push(events[key]);
    }

    return (
        <div>
            {allEvents.map((event) => (
                <div className="event-card" key={event.id}>
                    <h2>{event.name}</h2>
                    <p>Host: {event.User.username}</p>
                    <p>Format: {event.Game.name}</p>
                    <p>Location: {event.Location.name}</p>
                </div>
            ) )}
        </div>
    )
}

export default Events