import { Link } from "gatsby"
import React from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"


// const HitCount = connectStateResults(({ searchResults }) => {
//   const hitCount = searchResults && searchResults.nbHits
//   return hitCount > 0 ? (
//     <div className="HitCount">
//       搜尋結果{hitCount}筆
//     </div>
//   ) : null
// })

const AllHitCounts = connectStateResults(({ allSearchResults }) => {
  
  const totalCounts = allSearchResults &&
  Object.values(allSearchResults)
  .map(indice=>indice.nbHits)
  .reduce((acc,nbHits)=>acc+nbHits,0)

  return totalCounts > 0 ? (
    <div className="HitCount">
      搜尋結果{totalCounts}筆
    </div>
  ) : null
})

const PageHit = ({ hit }) => (
  <div>
    <Link to={hit.slug}>
      <h4 className="f5 lh-title fw7 mv2">
        <Highlight attribute="title" hit={hit} tagName="mark" />
        <Highlight attribute="projectName" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    <Snippet attribute="introduction" hit={hit} tagName="mark" />
    <Snippet attribute="section" hit={hit} tagName="mark" />
  </div>
)

const HitsInIndex = ({ index }) => {
    return (
        <Index indexName={index.name}>
            {/* <HitCount /> */}
            <Hits className="Hits" hitComponent={PageHit} />
        </Index>
)}

const SearchResult = ({ indices,show }) => {
  
    return (
        <div className="center mt2 w-90 vh-75 overflow-scroll">
            {
                show &&
                    <>
                        <AllHitCounts />
                        {
                            indices.map(index => (
                                <HitsInIndex index={index} key={index.name} />
                            ))
                        }
                    </>
            }
            <PoweredBy />
        </div>
    )
}

export default SearchResult