import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllEvents } from "../../../store/events"
import { getUsers } from "../../../store/session";
import "./EventPage.css"

const EventPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEvents())
        dispatch(getUsers())
    }, [dispatch])

    const events = useSelector((state) => state.events.events);
    const allUsers = useSelector((state) => state.session.allUsers)

    const rsvpMembers = [];

    const params = useParams();

    const { eventId } = params;

    const currentEvent = events?.find((event) => event.id === +eventId)
    // const attendees = allUsers.find((user) => user.RSVPs.includes(eventId) === currentEvent.id)
    const RSVPs = allUsers[1]?.RSVPs
    RSVPs?.forEach((rsvp) => console.log(rsvp.eventId))
    // console.log(attendees)

    return (
        <div className="body">
            <div className="main-card">
                <div className="main-details">
                    <p><span className="event-date">{currentEvent?.date}</span></p>
                    <h1>{currentEvent?.name}</h1>
                    <p className="event-location">{currentEvent?.Location?.name} • {currentEvent?.Location?.address}</p>
                    <p>Hosted by <span className="event-host">{currentEvent?.User?.username}</span></p>
                </div>
            </div>
            <div className="details">
                <div className="attendees">
                    <h3>Details</h3>
                    <p> <span>Description:</span> {currentEvent?.Game?.description}</p>
                    <p> <span>Format:</span> {currentEvent?.Game?.name}</p>
                    <p> <span>Format Details:</span> {currentEvent?.Game?.format}</p>
                    <p> <span>Players per Pod:</span> {currentEvent?.Game?.playerlimit}</p>
                    <h3>Attendees ({currentEvent?.RSVPs?.length})</h3>
                    <div>
                      {/* add attendees here */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPage;