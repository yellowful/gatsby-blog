import React, { createRef, useState } from "react"
import { InstantSearch, Configure, Pagination } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import CustomSearchBox from "./custom-search-box.js"
import SearchResult from "./search-result.js"
import useClickOutside from "./use-click-outside"

//用來放在navbar裡面，顯示搜尋框的component
//navbar裡面的搜尋圖案被點的時候，從showSearch傳進來，就render所有component
//如果點了搜尋框以外的東西，也就是已經不是focus了，那就把傳進來的setShowSearch設成false
export default function Search({ indexName, showSearch, setShowSearch }) {
  //把搜尋框第一層設定ref，如此可以讓useClickOutside判斷，是不是點在搜尋框外面了
  const rootRef = createRef()

  const [query, setQuery] = useState()
  //用來連接algolia search api的key
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  //用來偵測是不是unfocus了
  useClickOutside(rootRef, () => {
    setShowSearch(false);
    setQuery('');
  })
  //假如要顯示搜尋框，就顯示CustomSearchBox、SearchResult、Pagination
  //SearchResult是在query有東西的時候，才會顯示。不然一點SearchResult還沒開始搜尋就會顯示所有的結果
  //搜尋框有打字的時候才會顯示Pagination，pagination有顯示上一頁和下一頁的按鈕
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
