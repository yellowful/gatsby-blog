import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBox = ({ refine, currentRefinement, onFocus }) => {
  return (
    // return the DOM output
      <form className="field mt2">
        <p className="control has-icons-right">
          <input
            className="input"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={e => refine(e.target.value)}
            value={currentRefinement}
            onFocus={onFocus}
          />
          <span className="icon is-small is-right">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </p>
      </form>
  )
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;

