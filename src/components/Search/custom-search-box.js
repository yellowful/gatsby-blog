import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBox = ({ refine, currentRefinement }) => {

  return (
    // return the DOM output
    <form className="field" noValidate action="" role="search">
        <p className="pa2 control has-icons-right">
          {/*eslint-disable*/}
          <input
            className="input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={e => refine(e.target.value)}
            value={currentRefinement}
            style={{borderRadius:`9999px`}}
            autoFocus
          />
          {/*eslint-enable*/}
          <span className="icon is-small is-right">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </p>
    </form>
  )
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;

