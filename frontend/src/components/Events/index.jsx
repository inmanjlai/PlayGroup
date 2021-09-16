import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import './Events.css'
import { createOneRSVP, deleteOneRSVP } from "../../store/events"
import { getAllEvents } from "../../store/events"

const Events = () => {
    const dispatch = useDispatch()
    
    const user = useSelector((state) => state.session.user)
    const events = useSelector((state) => state.events.events)
    
    useEffect(() => {
        dispatch(getAllEvents())
    },[dispatch])

    let alreadyMember = (event) => {
        for(let groupMember in event.RSVPs){
            let member = event.RSVPs[groupMember]
            if(member?.userId === user?.id){
                return true
            }
        }
        return false
    }

        return (
            <div className="event-body">
                <div className="nav-links">
                    <div>
                        <h2><NavLink to="/events">Events</NavLink></h2>
                        <h2><NavLink to="/Groups">Groups</NavLink></h2>
                    </div>
                    {user && (<NavLink to="/events/new" className="new-event">
                        <button className="new-event-button">Host an event</button>
                    </NavLink>)}
                </div>
                {events && (<div className="card-container">
                    {events?.map((event) => (
                        <div className="event-card" key={event.id}>

                            <div className="image">
                                <img src={event.image} alt="nothing" />
                            </div>

                            <div className="date">
                                <p>{event.date}</p>
                            </div>
                            <div className="title">
                                <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
                            </div>

                            <div className="location">
                                <p>{event.Location.name}</p>
                                <p>•</p>
                                <p>{event.RSVPs?.length} {event.RSVPs?.length === 1 ? "attendee": "attendees"}</p>                            
                            </div>

                            <div className="user-controls">

                                {user && (user?.id !== event.hostId ? (!alreadyMember(event) ? ( <button className="attend-button" onClick={(e) => dispatch(createOneRSVP({userId: user.id, eventId: event.id}))}>Attend Event</button> ) : ( <button className='attend-button-leave' onClick={(e) => dispatch(deleteOneRSVP({userId: user.id, eventId: event.id}))}>Cancel Attend</button> )) : false)}

                                {user && event?.User?.id === user.id ? <button className="edit-button"><NavLink to={`/events/${event.id}/edit`}>Edit</NavLink></button> : false}
                            </div>
                        </div>
                    ) )}
                </div>)}
            </div>
        )
}

export default Events