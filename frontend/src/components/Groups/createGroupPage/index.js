import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createOneGroup } from "../../../store/groups";

const CreateGroupPage = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ownerId, setOwnerId] = useState(1);
    const [image, setImage] = useState("");

    const user = useSelector((state) => state.session.user)

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setOwnerId(user?.id)
    },[user?.id])

    const handleCreate = (e) => {
        e.preventDefault();

         const formData = {
             name,
             description,
             ownerId,
             image
         }

         dispatch(createOneGroup(formData))
         history.push('/groups')
    }

    return (
        <div className="edit-form-container">
            <form onSubmit={handleCreate}>
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
            </form>

        </div>
    )
}

export default CreateGroupPage;