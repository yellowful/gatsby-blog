import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState } from "react"
import { InstantSearch,Configure } from "react-instantsearch-dom"
import CustomSearchBox from "./custom-search-box.js"
import SearchResult from "./search-result.js"
import useClickOutside from "./use-click-outside"



export default function Search({ indices,showSearch,setShowSearch }) {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )


  useClickOutside(rootRef, () => {
    setFocus(false);
    setShowSearch(false);
  })
    
  if(showSearch){
    return(
      <div className="absolute top-0 w-100 bg-transparent z-5">
        <div 
          className="br3 center left-0 w-90 w-80-m w-70-l mw6 w-60 ma5 bg-mid-gray o-90 z-5" 
          ref={rootRef}
        >
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
          >
          <Configure
            hitsPerPage={4}
            attributesToSnippet={['*:50']}
          />
            <CustomSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
            <SearchResult
              show={query && query.length > 0 && hasFocus}
              indices={indices}
            />
          </InstantSearch>
        </div>
      </div>
    )
  } else {
    return null
  }
}