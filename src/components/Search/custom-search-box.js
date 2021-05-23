import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

//放在index.js裡面，就是Search component裡面
//是custom的，要丟進去api的connectSearchBox，algolia就會把refine和currentRefinement丟進來
//refine是傳input裡打字的東西進去，currentRefinement是又傳回來
const SearchBox = ({ refine, currentRefinement }) => {
  //ios上面的input外框還沒搜尋時會變圓形，所以乾脆把border設成圓形
  //autoFocus會讓eslint警告，因為search功能本來就適合autoFocus，所以把eslint的警告關掉
  return (
    // return the DOM output
    <form className="field" noValidate action="" role="search">
      <p className="pa2 control has-icons-right">
        {/*eslint-disable*/}
        <input
          className="input input-reset"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => refine(e.target.value)}
          value={currentRefinement}
          autoFocus
        />
        {/*eslint-enable*/}
        <span className="icon is-small is-right">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </p>
    </form>
  )
}

const CustomSearchBox = connectSearchBox(SearchBox)

export default CustomSearchBox
