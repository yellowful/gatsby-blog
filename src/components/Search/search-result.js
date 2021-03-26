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

//這是custom的，用來render搜尋到的統計筆數
//需要丟到connectStateResults裡，才會得到algolia丟進來的searchResults
const StateResults = ({ searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;
  const nbHits = searchResults && searchResults.nbHits;

  return (
    <div>
      <div key="search-result-with-number" className="near-white" hidden={!hasResults}>搜尋結果
        <span className="orange">
            {nbHits}
        </span>
        筆
      </div>
      <div key="search-result-without-number" className="near-white" hidden={hasResults}>
        沒有符合搜尋的結果
      </div>
    </div>
  );
};

//StateResults是custom的，丟給connectStateResults後，可以得到render的搜尋統計，可以放到SearchResult來用
const HitCounts = connectStateResults(StateResults);

//是一個custom用來顯示搜尋結果的component，要傳給api的Hits的hitComponent的property
//Highlight是api的，用來顯示搜尋到的標題
//Snippet是api的，用來顯示搜尋到的摘要
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

//放在SearchResult裡面，負責顯示搜尋結果的摘要
//Index是api提供的，需要傳要搜尋的indice給algolia
//Hits是api的，可以把custom的PageHit傳進去，會把搜尋結果render出來
const HitsInIndex = ({ index }) => {
  //console.log("HitsInIndex",index)
  return (
    <Index indexName={index}>
      {/* <HitCount /> */}
      <Hits className="Hits" hitComponent={PageHit} />
    </Index>
  )
}

//放在Search component裡面，用來顯示搜尋結果
//不是api提供的，是需要自己建立的
//需要把要跟algolia說的indice的名字傳進來，丟給api的Index
//傳show進來，決定要不要顯示
//HitCounts是搜尋中的次數、HitsInIndex是搜尋中的內容、customPoweredBy是algolia的連結，這三個都是custom的，裡面都會有api的component
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