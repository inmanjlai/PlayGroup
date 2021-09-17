import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllGroups, joinOneGroup, leaveOneGroup } from "../../../store/groups";
import { getUsers } from "../../../store/session";
import { NavLink } from "react-router-dom";
import "./../../Events/EventPage/EventPage.css"
import "../Groups.css"

const GroupPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGroups())
        dispatch(getUsers())
    }, [dispatch])


    let alreadyMember = (group) => {
        if(group){
            for(let groupMember in group.Users){
                let member = group?.Users?.[groupMember]
                if(member?.id === user?.id){
                    return true
                }
            }
            return false
        }
    }

    const groups = useSelector((state) => state.groups.groups);
    const allUsers = useSelector((state) => state.session.allUsers)
    const user = useSelector((state) => state.session.user)

    const params = useParams();

    const { groupId } = params;

    const currentGroup = groups?.find((group) => group.id === +groupId)
    // const attendees = allUsers.find((user) => user.RSVPs.includes(groupId) === currentGroup.id)
    const Members = allUsers[1]?.userGroups
    Members?.forEach((member) => console.log(member.groupId))
    // console.log(attendees)

    return (
        <div className="body">
            <div className="group-main-card">
                <div className="group-image">
                    <img src={currentGroup?.image} alt="" />
                </div>
                <div className="main-details">
                    <h1>{currentGroup?.name}</h1>
                    <p className="group-members">{currentGroup?.Users?.length} {currentGroup?.Users?.length === 1 ? "member" : "members"}</p>
                    <p>Organized by <span className="group-host">{currentGroup?.Users?.map((user) => user.id === currentGroup?.ownerId ? <span key={user.id}>{user.username}</span> : false)}</span></p>

                    {user?.id === currentGroup?.ownerId ? <button className="edit-button"><NavLink to={`/groups/${currentGroup.id}/edit`}>Edit Group</NavLink></button>  : false}

                    {user && (user?.id !== currentGroup?.ownerId ? (!alreadyMember(currentGroup) ? ( <button className="group-button" onClick={(e) => dispatch(joinOneGroup({groupId: currentGroup.id, userId: user.id}))}>Join Group</button> ) : ( <button className='group-button-leave' onClick={(e) => dispatch(leaveOneGroup({groupId: currentGroup.id, userId: user.id}))}>Leave Group</button> )) : false)}
                </div>
            </div>
            <div className="secondary-container">
                <div className="group-details">
                    <div className="members">
                        <div className="left">
                            <h3>What we're about</h3>
                            <p> {currentGroup?.description}</p>
                        </div>
                        <div className="right">
                            <h3 className="">Members ({currentGroup?.Users?.length})</h3>
                            <div className="group-member-list">
                            {currentGroup?.Users?.map((user) => {
                                return (
                                    <div className="user-card">
                                        <div className="user-image">
                                            <img src={user.image} alt="img" />
                                        </div>
                                        <h4>{user.username}</h4>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupPage;