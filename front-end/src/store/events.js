import { csrfFetch } from "./csrf";

export const GET_EVENTS = 'event/GET_EVENTS'
export const GET_GAMES = 'games/GET_GAMES'
export const CREATE_EVENT = 'event/CREATE_EVENT'

const getEvents = (events) => ({
    type: GET_EVENTS,
    events
});

const getGames = (games) => ({
    type: GET_GAMES,
    games
})

const createEvent = (event) => ({
    type: CREATE_EVENT,
    event
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

export const getAllGames = () => async(dispatch) => {

    const response = await csrfFetch('/api/games')
    if(response.ok){
        const games = await response.json()
        dispatch(getGames(games))
        return games;
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

const eventReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_EVENTS:
            newState = Object.assign({}, newState);
            action.events.forEach((event) => newState[event.id] = event);
            return newState;
        case GET_GAMES:
            newState = Object.assign({}, newState);
            action.games.forEach((game) => newState[game.id] = game);
            return newState
        default:
            return state;
    }
}

export default eventReducer;
