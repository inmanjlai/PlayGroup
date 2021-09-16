import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { deleteOneGroup, editOneGroup } from "../../../store/groups";

const EditGroupPage = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ownerId, setOwnerId] = useState(1);
    const [image, setImage] = useState("");

    const user = useSelector((state) => state.session.user)
    const params = useParams()

    const { groupId } = params;

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setOwnerId(user.id)
    },[user.id])

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
        <div>
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