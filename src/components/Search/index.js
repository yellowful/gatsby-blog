import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState } from "react"
import { InstantSearch, Configure, Pagination } from "react-instantsearch-dom"
import CustomSearchBox from "./custom-search-box.js"
import SearchResult from "./search-result.js"
import useClickOutside from "./use-click-outside"



export default function Search({ indexName, showSearch, setShowSearch }) {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  useClickOutside(rootRef, () => {
    setShowSearch(false);
    setQuery('');
  })

  if (showSearch) {
    return (
      <div className="absolute top-0 w-100 bg-transparent z-5">
        <div
          className="br3 center left-0 w-90 w-80-m w-70-l mw6 w-60 ma5 bg-mid-gray o-90 z-5"
          ref={rootRef}
        >
          <InstantSearch
            searchClient={searchClient}
            indexName={indexName}
            onSearchStateChange={({ query }) => setQuery(query)}
          >
            <Configure
              hitsPerPage={4}
              attributesToSnippet={['*:30']}
            />
            <CustomSearchBox />
            <SearchResult
              show={query && query.length > 0}
              indexName={indexName}
            />
            {
              query && query.length > 0 ?
                (
                  <Pagination
                    showFirst={false}
                    translations={{
                      previous: '‹',
                      next: '›',
                      page(currentRefinement) {
                        return currentRefinement;
                      },
                      ariaPrevious: 'Previous page',
                      ariaNext: 'Next page',
                      ariaPage(currentRefinement) {
                        return `Page ${currentRefinement}`;
                      },
                    }}
                  />
                )
                :
                null
            }
          </InstantSearch>
        </div>
      </div>
    )
  } else {
    return null
  }
}
