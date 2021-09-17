import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { searchEvents } from "../../store/events";
import { NavLink } from "react-router-dom";
import { createOneRSVP, deleteOneRSVP } from "../../store/events";

const Results = () => {

    const events = useSelector((state) => state.events.events)
    const user = useSelector((state) => state.session.user)

    const params = useParams()
    const dispatch = useDispatch()

    const { searchQuery } = params;
    console.log(searchQuery)

    useEffect(() => {
        dispatch(searchEvents(searchQuery))
    }, [])

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
            <div style={{margin: "1rem"}}>
                <h1>Search Results</h1>
            </div>
            <div>
                {events?.map((event) => {
                    return(
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
                                <p>{event.Location?.name}</p>
                                <p>•</p>
                                <p>{event.RSVPs?.length} {event.RSVPs?.length === 1 ? "attendee": "attendees"}</p>                            
                            </div>

                            <div className="user-controls">

                                {user && (user?.id !== event.hostId ? (!alreadyMember(event) ? ( <button className="attend-button" onClick={(e) => dispatch(createOneRSVP({userId: user.id, eventId: event.id}))}>Attend Event</button> ) : ( <button className='attend-button-leave' onClick={(e) => dispatch(deleteOneRSVP({userId: user.id, eventId: event.id}))}>Cancel Attend</button> )) : false)}

                                {user && event?.User?.id === user.id ? <button className="edit-button"><NavLink to={`/events/${event.id}/edit`}>Edit</NavLink></button> : false}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Results;