import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllGroups, joinOneGroup, leaveOneGroup } from "../../../store/groups";
import { createComment, getUsers } from "../../../store/session";
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
    const [body, setBody] = useState("")

    const me = allUsers?.find((uuser) => +uuser?.id === +user?.id);

    const params = useParams();

    const { groupId } = params;

    const currentGroup = groups?.find((group) => group.id === +groupId)
    const Members = allUsers[1]?.userGroups
    Members?.forEach((member) => console.log(member.groupId))

    const userComments = []
    allUsers?.forEach((user) => user?.Comments?.map((comment) => +comment?.groupId === +groupId ? userComments?.push({body: comment?.body, username: user?.username, image: user?.image}) : false))


    const handleCreateComment = (e) => {
        e.preventDefault();

        const comment = {
            userId: user.id,
            body: body,
            groupId: currentGroup.id
        }
        setBody("")
        //dispatch creation of a comment here
        dispatch(createComment(comment))

    }

    return (
        <div className="main-body">
                <div className="group-main-card">
                    <div className="group-image">
                        <img src={currentGroup?.image} alt="" />
                    </div>
                    <div className="main-details">
                        <h1>{currentGroup?.name}</h1>
                        <h2 className="group-members">{currentGroup?.Users?.length} {currentGroup?.Users?.length === 1 ? "member" : "members"}</h2>
                        <h2>Organized by <span className="group-host">{currentGroup?.Users?.map((uuser) => uuser.id === currentGroup?.ownerId ? <span key={uuser.id}>{uuser.username}</span> : false)}</span></h2>

                        {user?.id === currentGroup?.ownerId ? <button className="edit-button"><NavLink to={`/groups/${currentGroup?.id}/edit`}>Edit Group</NavLink></button>  : false}

                        {user && (user?.id !== currentGroup?.ownerId ? (!alreadyMember(currentGroup) ? ( <button className="group-button" onClick={(e) => dispatch(joinOneGroup({groupId: currentGroup.id, userId: user.id}))}>Join Group</button> ) : ( <button className='group-button-leave' onClick={(e) => dispatch(leaveOneGroup({groupId: currentGroup.id, userId: user.id}))}>Leave Group</button> )) : false)}
                    </div>
                </div>
                    <div className="group-details">
                            <h3>What we're about</h3>
                            <p> {currentGroup?.description}</p>
                    </div>  
                    <div className="comments">

                        {user && (<div className="create-a-comment">
                            <form className="comment-form" onSubmit={handleCreateComment}>
                                <textarea placeholder="Join the discussion or simply ask a question!" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                                <div className='me-card'>
                                    <span>
                                        <div className="comment-image">
                                            <img src={me?.image} alt=""/>
                                        </div>
                                        <p>{me?.username}</p>
                                    </span>
                                    <button>Submit</button>
                                </div>
                            </form>
                        </div>)}

                        {userComments.map((comment) => {
                            return (
                                <div className="comment-card">
                                    <h4>{comment.body}</h4>
                                    <div className="card-user">
                                        <div className="comment-image">
                                            <img src={comment.image} alt="" />
                                        </div>
                                        <p>{comment.username}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="members">
                        <h3 className="">Members ({currentGroup?.Users?.length})</h3>
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
    )
}

export default GroupPage;