import { Link } from "gatsby"
import React from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet
} from "react-instantsearch-dom"
import CustomPoweredBy from './CustomPoweredBy'

const StateResults = ({ searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;
  const nbHits = searchResults && searchResults.nbHits;

  return (
    <div>
      <div className="near-white" hidden={!hasResults}>搜尋結果
      <span className="orange">
          {nbHits}
        </span>
       筆
       </div>
      <div className="near-white" hidden={hasResults}>沒有符合搜尋的結果</div>
    </div>
  );
};

const HitCounts = connectStateResults(StateResults);



// const AllHitCounts = connectStateResults(({ allSearchResults, searchResults }) => {
//   console.log(`allSearchResults`, allSearchResults, `searchresults`, searchResults)
//   const nbHits = allSearchResults.nbHits ?? 0;
//   return (
//     nbHits > 0 ?
//       (
//         <div className="near-white">
//           搜尋結果
//           <span className="orange">
//             {allSearchResults.nbHits}
//           </span>
//           筆
//         </div>
//       )
//       :
//       (
//         <div className="near-white">
//           沒有符合搜尋的結果
//         </div>
//       )
//   )
// })

const PageHit = ({ hit }) => (
  <div className="bg-dark-gray br3">
    <Link to={hit.slug}>
      <h4 className="f5 light-blue lh-title fw7 mv2">
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <div className="f6 fw5 near-white anchor-word-breaker">
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
  </div>
)

const HitsInIndex = ({ index }) => {
  //console.log("HitsInIndex",index)
  return (
    <Index indexName={index}>
      {/* <HitCount /> */}
      <Hits className="Hits" hitComponent={PageHit} />
    </Index>
  )
}

const SearchResult = ({ indexName, show }) => {
  return (
    <div className="center mt2 w-90">
      {
        show &&
        (
          <div className="h-100">
            <HitCounts />
            <HitsInIndex index={indexName} />
          </div>
        )
      }
      <CustomPoweredBy />
    </div>
  )
}

export default SearchResult