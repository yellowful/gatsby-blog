import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import CustomSearchBox from "./custom-search-box.js"
import SearchResult from "./search-result.js"
import useClickOutside from "./use-click-outside"



export default function Search({ indices }) {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useClickOutside(rootRef, () => setFocus(false))

  console.table({query:query,hasFocus:hasFocus})

  return (
      <div className="absolute top-0 left-0 w-100 vh-100 bg-transparent z-5">
        <div className="center mw6 w-60 ma5 bg-near-white o-90 z-5" ref={rootRef}>
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
          >
            <CustomSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
            <SearchResult
              show={query && query.length > 0 && hasFocus}
              indices={indices}
            />
          </InstantSearch>
        </div>
      </div>
  )
}