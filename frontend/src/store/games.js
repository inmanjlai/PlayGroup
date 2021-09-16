import { csrfFetch } from "./csrf";

export const GET_GAMES = 'games/GET_GAMES'

const getGames = (games) => ({
    type: GET_GAMES,
    games
});

const initialState = {games: null};

export const getAllGames = () => async(dispatch) => {

    const response = await csrfFetch("/api/games");
    if(response.ok){
        const games = await response.json();
        dispatch(getGames(games));
        return games;
    }
    return false;
}

const gamesReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_GAMES:
            newState = Object.assign({}, state);
            newState.games = action.games
            return newState;
        default:
            return state;
    }
}

export default gamesReducer;
