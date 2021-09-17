import { useState } from "react"
import { searchEvents } from "../../store/events";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault();

        //dispatch to search results passing in search query
        dispatch(searchEvents(searchQuery))
        history.push(`/results/${searchQuery}`)
    }

    const searchStyle = {
        backgroundColor: "transparent",
        boxShadow: "none"
    }

    return (
        <form onSubmit={handleSearch} style={searchStyle}>
            <input type="text"
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value)}}
            />
        </form>
    )
}

export default SearchBar;
