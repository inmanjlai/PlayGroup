import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { deleteOneEvent, editOneEvent } from "../../../store/events";
import { getAllGames } from "../../../store/games";
import { getAllLocations } from "../../../store/locations";

const EditFormPage = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const params = useParams();
    
    const { eventId } = params;

    const [name, setName] = useState("")
    const [format, setFormat] = useState(1)
    const [locationId, setLocationId] = useState(1)
    const [hostId, setHostId] = useState(1)
    const [date, setDate] = useState("")
    const [image, setImage] = useState("")

    const user = useSelector((state) => state.session.user)

    useEffect(() => {
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
                        {games?.map((game) => <option value={game.id} key={game.id}>{game.name}</option> )}
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
                </form>

                <form onSubmit={handleDelete}>
                    <button type="submit">Delete this Event</button>
                </form>
            </div>
    )
}

export default EditFormPage;