import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllGroups } from "../../store/groups"
import './Groups.css'

const Groups = () => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllGroups())
    },[dispatch])

    const groups = useSelector((state) => state.groups)
    const user = useSelector((state) => state.session.user)

    const allGroups = [];
    for(let key in groups){
        allGroups.push(groups[key]);
    }

    return (
        <div className="groups-container">
            {allGroups.map((group) => (
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
    )
}

export default Groups;