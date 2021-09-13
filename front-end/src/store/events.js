import { csrfFetch } from "./csrf";

export const GET_EVENTS = 'event/GET_EVENTS'
export const GET_GAMES = 'games/GET_GAMES'
export const CREATE_EVENT = 'event/CREATE_EVENT'
export const EDIT_EVENT = 'event/EDIT_EVENT'
export const DELETE_EVENT = 'event/DELETE_EVENT'
export const CREATE_RSVP = 'event/CREATE_RSVP'

const getEvents = (events) => ({
    type: GET_EVENTS,
    events
});

const editEvent = (formData) => ({
    type: EDIT_EVENT,
    formData
})

const createEvent = (event) => ({
    type: CREATE_EVENT,
    event
})

const deleteEvent = (formData) => ({
    type: DELETE_EVENT,
    formData
})

const createRSVP = (userId, eventId) => ({
    type: CREATE_RSVP,
    userId,
    eventId
})

const initialState = {};

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
    const response = await csrfFetch('/api/rsvp', 
    {
        method: "POST",
        body: JSON.stringify(userId, eventId)
    })
    if (response.ok) {
        const rsvp = await response.json();
        dispatch(createRSVP(rsvp));
        return rsvp;
    }
    return false;
}

const eventReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_EVENTS:
            newState = Object.assign({}, state);
            action.events.forEach((event) => newState[event.id] = event);
            return newState;
        case CREATE_RSVP:
            newState = Object.assign({}, state);
            action.events.forEach((event) => newState[event.id] = event);
            return newState;
        default:
            return state;
    }
}

export default eventReducer;
