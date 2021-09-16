import { csrfFetch } from "./csrf";

export const GET_EVENTS = 'event/GET_EVENTS'
export const CREATE_EVENT = 'event/CREATE_EVENT'
export const EDIT_EVENT = 'event/EDIT_EVENT'
export const DELETE_EVENT = 'event/DELETE_EVENT'

const createEvent = (event) => ({
    type: CREATE_EVENT,
    event
})

const getEvents = (events) => ({
    type: GET_EVENTS,
    events
});

const editEvent = (event) => ({
    type: EDIT_EVENT,
    event
})


const deleteEvent = (event) => ({
    type: DELETE_EVENT,
    event
})

const initialState = {events: null};

export const getAllEvents = () => async(dispatch) => {

    const response = await csrfFetch("/api/events");
    if(response.ok){
        const events = await response.json();
        dispatch(getEvents(events));
        return events;
    }
    return false;
}

export const createOneEvent = (formData) => async(dispatch) => {
    const response = await csrfFetch('/api/events', 
        {
            method: "POST",
            body: JSON.stringify(formData)
        }
    )
    if(response.ok){
        const event = await response.json();
        dispatch(createEvent(event))
        return event;
    }
    return false;
}

export const editOneEvent = (formData) => async(dispatch) => {
    const response = await csrfFetch('/api/events', 
        {
            method: "PUT",
            body: JSON.stringify(formData)
        }
    )
    if(response.ok){
        const event = await response.json();
        dispatch(editEvent(event))
        return event;
    }
    return false;
}

export const deleteOneEvent = (formData) => async(dispatch) => {
    const response = await csrfFetch('/api/events', 
        {
            method: "DELETE",
            body: JSON.stringify(formData)
        }
    )
    if(response.ok){
        const event = await response.json();
        dispatch(deleteEvent(event))
        return event;
    }
    return false;
}

export const createOneRSVP = ({userId, eventId}) => async(dispatch) => {
    const response = await csrfFetch('/api/rsvps', 
    {
        method: "POST",
        body: JSON.stringify({userId: userId, eventId: eventId})
    })
    if (response.ok) {
        const events = await response.json();
        dispatch(getEvents(events));
        return events;
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
        const events = await response.json();
        dispatch(getEvents(events))
        return events;
    }
    return false;
}

const eventReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_EVENTS:
            newState = Object.assign({}, state);
            newState.events = action.events
            return newState;
        case CREATE_EVENT:
            newState = Object.assign({}, state);
            newState.events[action.event.id] = action.event;
            return newState;
        case EDIT_EVENT:
            newState = Object.assign({}, state);
            newState.events[action.event.id] = action.event
            return newState;
        case DELETE_EVENT:
            newState = Object.assign({}, state);
            for(let event in newState){
                if(newState[event].id === action.event.id){
                    delete newState[event]
                }
            }
            return newState;
        default:
            return state;
    }
}

export default eventReducer;
