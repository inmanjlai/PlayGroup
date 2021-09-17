import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { deleteOneEvent, editOneEvent, getAllEvents } from "../../../store/events";
import { getAllGames } from "../../../store/games";
import { getAllLocations } from "../../../store/locations";

const EditFormPage = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const params = useParams();
    
    const { eventId } = params;

    
    const user = useSelector((state) => state.session.user)
    const events = useSelector((state) => state.events.events)
    
    const currentEvent = events?.find((event) => event.id === +eventId)
    
    const [name, setName] = useState(currentEvent?.name)
    const [format, setFormat] = useState(currentEvent?.format)
    const [locationId, setLocationId] = useState(currentEvent?.locationId)
    const [hostId, setHostId] = useState(currentEvent?.hostId)
    const [date, setDate] = useState(currentEvent?.date)
    const [image, setImage] = useState(currentEvent?.image)

    useEffect(() => {
        dispatch(getAllEvents())
        dispatch(getAllGames())
        dispatch(getAllLocations())
    }, [dispatch])
    
    useEffect(() => {
        setHostId(user.id)
    }, [user.id])

    const games = useSelector((state) => state.games.games);
    const locations = useSelector((state) => state.locations.locations)


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name, format, locationId, hostId, date, eventId, image
        }
        dispatch(editOneEvent(formData))
        history.push('/events')
    }

    const handleDelete = () => {

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
                        {games?.map((game) => <option value={game.id} key={game.id}>{game.name}</option> )}
                    </select>

                    <label htmlFor="date">Event Date</label>
                    <input 
                        type="date" 
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}    
                    />
                    <label htmlFor="locationId">Location</label>
                    <select 
                        value={locationId}
                        onChange={(e) => setLocationId(e.target.value)}
                        name="locationId"
                        >
                        {locations?.map((location) => <option value={location.id} key={location.id}>{location.name}</option> )}
                    </select>
                    <label htmlFor="name">Image Url</label>
                    <input 
                        type="text"
                        name="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    

                    <button type="submit">Submit</button>
                    <button onClick={() => handleDelete()}>Delete this Event</button>
                </form>

            </div>
    )
}

export default EditFormPage;