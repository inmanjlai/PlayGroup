import { csrfFetch } from "./csrf";

export const GET_RSVPS = 'rsvp/GET_RSVPS'
export const CREATE_RSVP = 'rsvp/CREATE_RSVP'
export const EDIT_RSVP = 'rsvp/EDIT_RSVP'
export const DELETE_RSVP = 'rsvp/DELETE_RSVP'

const getRSVPs = (rsvp) => ({
    type: GET_RSVPS,
    rsvp
});

const editRSVP = (formData) => ({
    type: EDIT_RSVP,
    formData
})

const deleteRSVP = (rsvp) => ({
    type: DELETE_RSVP,
    rsvp
})

const createRSVP = (eventId, rsvp) => ({
    type: CREATE_RSVP,
    eventId,
    rsvp
})

const initialState = {};

export const getAllRSVPs = () => async(dispatch) => {

    const response = await csrfFetch("/api/rsvps");
    if(response.ok){
        const rsvp = await response.json();
        dispatch(getRSVPs(rsvp));
        return rsvp;
    }
    return false;
}

export const editOneRSVP = ({userId, eventId}) => async(dispatch) => {
    const response = await csrfFetch('/api/rsvps', 
        {
            method: "PUT",
            body: JSON.stringify(userId, eventId)
        }
    )
    if(response.ok){
        const rsvp = await response.json();
        dispatch(editRSVP(rsvp))
        return rsvp;
    }
    return false;
}

export const deleteOneRSVP = ({userId, eventId}) => async(dispatch) => {
    const response = await csrfFetch('/api/rsvps', 
        {
            method: "DELETE",
            body: JSON.stringify({userId: userId, eventId:eventId})
        }
    )
    if(response.ok){
        const rsvp = await response.json();
        dispatch(deleteRSVP(rsvp))
        return rsvp;
    }
    return false;
}

export const createOneRSVP = ({userId, eventId}) => async(dispatch) => {
    console.log("creating request with", userId, eventId)
    const response = await csrfFetch('/api/rsvps', 
    {
        method: "POST",
        body: JSON.stringify({userId: userId, eventId: eventId})
    })
    console.log("req created", response.ok)
    if (response.ok) {
        const rsvp = await response.json();
        dispatch(createRSVP(eventId, rsvp));
        return rsvp;
    }
    return false;
}

const rsvpReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_RSVPS:
            newState = Object.assign({}, state);
            // action.rsvp.forEach((rsvp) => newState[rsvp.id] = rsvp);
            newState = [...action.rsvp]
            return newState;
        case CREATE_RSVP:
            debugger;
            newState = Object.assign({}, state);
            newState[action.rsvp.id] = action.rsvp;
            return newState;
        case DELETE_RSVP:
            newState = Object.assign({}, state);
            for(let rsvp in newState){
                if(newState[rsvp].id === action.rsvp.id){
                    delete newState[rsvp]
                }
            }
            return newState;
        default:
            return state;
    }
}

export default rsvpReducer;
