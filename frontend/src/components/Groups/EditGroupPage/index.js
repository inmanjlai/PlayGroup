import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { deleteOneGroup, editOneGroup, getAllGroups } from "../../../store/groups";

const EditGroupPage = () => {

    
    const user = useSelector((state) => state.session.user)
    const groups = useSelector((state) => state.groups.groups);
    
    const params = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    
        useEffect(() => {
            dispatch(getAllGroups())
        },[dispatch])
    
        useEffect(() => {
            setOwnerId(user.id)
        },[user.id])
    
    const { groupId } = params;
    const currentGroup = groups?.find((group) => group.id === +groupId)
    console.log(currentGroup, groupId, "<------------ currentGroup")
    
    const [name, setName] = useState(currentGroup?.name);
    const [description, setDescription] = useState(currentGroup?.description);
    const [ownerId, setOwnerId] = useState(currentGroup?.ownerId);
    const [image, setImage] = useState(currentGroup?.image);

    const handleEdit = (e) => {
        e.preventDefault();

         const formData = {
             name,
             description,
             groupId,
             image
         }

         dispatch(editOneGroup(formData))
         history.push('/groups')
    }

    const handleDelete = (e) => {
        e.preventDefault();
        
        dispatch(deleteOneGroup(groupId))
        history.push('/groups')
    }

    return (
        <div className="edit-form-container">
            <form onSubmit={handleEdit}>
                <label htmlFor="name">Group Name</label>
                <input 
                    type="text" 
                    name="name"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}    
                />
                <label htmlFor="description">Description</label>
                <textarea  
                    name="description"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}    
                />
                <input 
                    type="hidden" 
                    name="name"
                    value={ownerId} 
                />
                <label htmlFor="name">Image Url</label>
                    <input 
                        type="text"
                        name="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                />
                <button>Submit</button>
                <button onClick={handleDelete}>Delete</button>
            </form>

        </div>
    )
}

export default EditGroupPage;