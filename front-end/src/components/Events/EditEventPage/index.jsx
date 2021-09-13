import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { getEntireDatabase } from "../../../store/db";
import { deleteOneEvent, editOneEvent } from "../../../store/events";

const EditFormPage = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const params = useParams();
    
    const { eventId } = params;

    // const currentEvent = events.find((event) => event.id === eventId)

    const [name, setName] = useState("")
    const [format, setFormat] = useState(1)
    const [locationId, setLocationId] = useState(1)
    const [hostId, setHostId] = useState(1)
    const [date, setDate] = useState("")
    const user = useSelector((state) => state.session.user)
    const games = useSelector((state) => state.db.games)
    const locations = useSelector((state) => state.db.locations)

    const allGames = [];
    for (const key in games) {
        allGames.push(games[key]);
    }

    const allLocations = [];
    for (const key in locations) {
        allLocations.push(locations[key]);
    }


    useEffect(() => {
        setHostId(user.id)
        dispatch(getEntireDatabase())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name, format, locationId, hostId, date, eventId
        }
        dispatch(editOneEvent(formData))
        history.push('/events')
    }

    const handleDelete = (e) => {
        e.preventDefault();

        const formData = {eventId}
        dispatch(deleteOneEvent(formData))
        history.push("/events")
    }

    return(
            <div className="edit-form-container">
                <form onSubmit={handleSubmit}>

                    <label htmlFor="name">Event Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    <input 
                        type="hidden"
                        name="hostId"
                        value={hostId}
                    />
                    <input 
                        type="hidden"
                        name="eventId"
                        value={eventId}
                    />
                    <label htmlFor="name">Format</label>
                    <select 
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        name="format"
                        >
                        {allGames.map((game) => <option value={game.id} key={game.id}>{game.name}</option> )}
                    </select>

                    <label htmlFor="date">Event Date</label>
                    <input 
                        type="date" 
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}    
                    />

                    <select 
                        value={locationId}
                        onChange={(e) => setLocationId(e.target.value)}
                        name="locationId"
                        >
                        {allLocations.map((location) => <option value={location.id} key={location.id}>{location.name}</option> )}
                    </select>

                    <button type="submit">Submit</button>
                </form>

                <form onSubmit={handleDelete}>
                    <button type="submit">Delete this Event</button>
                </form>
            </div>
    )
}

export default EditFormPage;