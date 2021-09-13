import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { getEntireDatabase } from '../../store/db';
import { createOneEvent } from '../../store/events';
const { useState, useEffect } = require("react")

const CreateEventForm = () => {

    const [name, setName] = useState("");
    const [format, setFormat] = useState(1)
    const [date, setDate] = useState("")
    const [locationId, setLocationId] = useState(1)
    const [hostId, setHostId] = useState(1);

    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getEntireDatabase())
        setHostId(user.id)
    },[dispatch])
        

    const allGames = [];
    const allLocations = [];
    const games = useSelector((state) => state.db.games);
    const locations = useSelector((state) => state.db.locations);

    for (const key in locations) {
        allLocations.push(locations[key]);
    }

    for (const key in games) {
        allGames.push(games[key]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = {
            name, format, date, locationId, hostId
        }
        dispatch(createOneEvent(form))
        history.push('/events')
    }

    return (
        <div className="form-container">
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
        </div>
    )
}

export default CreateEventForm;