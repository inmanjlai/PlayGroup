import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEntireDatabase } from "../../store/db"
import { NavLink } from 'react-router-dom'
import './Events.css'
import { deleteOneEvent } from "../../store/events"

const Events = () => {
    const dispatch = useDispatch()

    const events = useSelector((state) => state.db.events);
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getEntireDatabase())
    }, [dispatch])
    
    
    const allEvents = [];
    for (const key in events) {
        allEvents.push(events[key]);
    }

    return (
        <div className="card-container">
            {allEvents.map((event) => (
                <div className="event-card" key={event.id}>
                    <h2>{event.name}</h2>
                    <p>Host: {event.User.username}</p>
                    <p>Date: {event.date}</p>
                    <p>Location: {event.Location.name}</p>
                    <p>Format: {event.Game.name}</p>
                    {user && event.User.id === user.id ? <NavLink to={`/events/${event.id}/edit`}>Edit</NavLink> : false}
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