import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { createOneGroup, editOneGroup } from "../../../store/groups";

const CreateGroupPage = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ownerId, setOwnerId] = useState(1);

    const user = useSelector((state) => state.session.user)
    const params = useParams()

    const { groupId } = params;

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setOwnerId(user.id)
    },[])

    const handleCreate = (e) => {
        e.preventDefault();

         const formData = {
             name,
             description,
             ownerId
         }

         dispatch(createOneGroup(formData))
         history.push('/groups')
    }

    return (
        <div>
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
                <button>Submit</button>
            </form>

        </div>
    )
}

export default CreateGroupPage;