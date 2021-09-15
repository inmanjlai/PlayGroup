import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllGroups } from "../../store/groups"
import { getAllRSVPs } from "../../store/rsvp"
import './Groups.css'

const Groups = () => {
    
    const dispatch = useDispatch()
    const groups = useSelector((state) => state.groups.groups)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllGroups())
    },[dispatch])


    return (
        <>
            {groups && (
                <div className="groups-container">
                {groups.map((group) => (
                    <div key={group.id}>
                        <h1>{group.name}</h1>
                        <span>Group Owner: {group.Users.map((user) => user.id === group.ownerId ? <span>{user.username}</span> : false)}</span>
                        <p>{group.description}</p>
                        <details>
                            <summary>
                                Members: ({group.Users.length})
                            </summary>
                            {group.Users.length > 0 ? group.Users.map((user) => <p>{user.username}</p>) : <p>No Members</p> }
                        </details>
                        {user && group.ownerId === user.id ? <NavLink to={`/groups/${group.id}/edit`}>Edit</NavLink> : false}
                    </div>
                ))}
            </div>
            )}
        </>
    )
}

export default Groups;