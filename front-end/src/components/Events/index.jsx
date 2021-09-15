import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import './Events.css'
import { createOneRSVP, deleteOneRSVP, getAllRSVPs } from "../../store/rsvp"
import { getAllEvents } from "../../store/events"

const Events = () => {
    const dispatch = useDispatch()
    
    const user = useSelector((state) => state.session.user)
    const events = useSelector((state) => state.events.events)
    const rsvps = useSelector((state) => state.rsvps.rsvps)
    
    useEffect(() => {
        dispatch(getAllEvents())
        dispatch(getAllRSVPs())
    },[dispatch])

        return (
            <div className="card-container">
                {events?.map((event) => (
                    <div className="event-card" key={event.id}>
                        <h2>{event.name}</h2>
                        <p>Host: {event.User.username}</p>
                        <p>Date: {event.date}</p>
                        <p>Location: {event.Location.name}</p>
                        <p>Format: {event.Game.name}</p>
                        <p>Attending: {event.RSVPs.length}</p>
                        <div className="user-controls">
                            {user && event.User.id !== user.id ? <button onClick={() => dispatch(createOneRSVP({userId: user.id, eventId: event.id}))}>Attend</button> : false}
                            {user && event.User.id !== user.id ? <button onClick={() => dispatch(deleteOneRSVP({userId: user.id, eventId: event.id}))}>Cancel</button> : false}
                            {user && event.User.id === user.id ? <NavLink to={`/events/${event.id}/edit`}>Edit</NavLink> : false}
                        </div>
                    </div>
                ) )}
    
                {user && (<NavLink to="/events/new" className="new-event-button">
                    <div className="new-event-card">
                        <h1>
                            <i className="fas fa-plus-square"></i>
                        </h1>
                    </div>
                </NavLink>)}
            </div>
        )
}

export default Events