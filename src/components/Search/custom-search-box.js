import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBox = ({ refine, currentRefinement, onFocus }) => {
    console.log({onFocus:onFocus,currentRefinement:currentRefinement});
    return(
    // return the DOM output
    <form>
      <input
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      <FontAwesomeIcon icon={faSearch} />
    </form>
    )
  };

const CustomSearchBox=connectSearchBox(SearchBox);

export default CustomSearchBox;

