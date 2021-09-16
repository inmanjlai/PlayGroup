import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllGroups, joinOneGroup, leaveOneGroup } from "../../store/groups"
import './Groups.css'

const Groups = () => {
    
    const dispatch = useDispatch()
    const groups = useSelector((state) => state.groups.groups)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllGroups())
    },[dispatch])

    let alreadyMember = (group) => {
        for(let groupMember in group.Users){
            let member = group.Users[groupMember]
            if(member?.id === user?.id){
                return true
            }
        }
        return false
    }

    return (
        <div className="group-body">
            <div className="nav-links">
                    <div>
                        <h2><NavLink to="/events">Events</NavLink></h2>
                        <h2><NavLink to="/Groups">Groups</NavLink></h2>
                    </div>
                    {user && (<NavLink to="/groups/new" className="new-event">
                        <button className="new-event-button">Start a new group</button>
                    </NavLink>)}
                </div>

            <div className="card-container">
            {groups?.map((group) => {
                return (
                    <div className="group-card" key={group.id}>
                        <div className="image">
                            <img src={group.image} alt="nothing" />
                        </div>
                        <div className="title">
                            <NavLink to={`/groups/${group.id}`}>{group.name}</NavLink>
                        </div>
                        <div className="owner-members">
                            <span>Group Owner: {group?.Users?.map((user) => user?.id === group?.ownerId ? <span key={user.id}>{user.username}</span> : false)}</span>
                            <p>•</p>
                            <p>Members: {group?.Users?.length}</p>
                        </div>
                        <div className="description">
                            <p>{group.description}</p>
                        </div>
                        <div className="user-controls">
                            {user?.id === group?.ownerId ? <button className="edit-button"><NavLink to={`/groups/${group.id}/edit`}>Edit Group</NavLink></button>  : false}

                            {/* THIS REALLY UGLY LINE ALLOWS USERS TO JOIN AND LEAVE GROUPS IF THE GROUP DOES NOT BELONG TO THEM */}
                            {user && (user?.id !== group?.ownerId ? (!alreadyMember(group) ? ( <button className="group-button" onClick={(e) => dispatch(joinOneGroup({groupId: group.id, userId: user.id}))}>Join Group</button> ) : ( <button className='group-button-leave' onClick={(e) => dispatch(leaveOneGroup({groupId: group.id, userId: user.id}))}>Leave Group</button> )) : false)}
                        </div>
                    </div>
                )
                })}
            </div>
        </div>
    )
}

export default Groups;