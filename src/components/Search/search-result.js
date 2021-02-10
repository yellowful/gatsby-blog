import { Link } from "gatsby"
import { default as React } from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"

const HitCount = connectStateResults(({ searchResults }) => {
    console.log('searchResults',searchResults);
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
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
            <HitCount />
            <Hits className="Hits" hitComponent={PageHit} />
        </Index>
)}

const SearchResult = ({ indices,show }) => {
    return (
        <div className="center mt2 w-90 vh-75 overflow-scroll">
            {
                
                show &&
                    <>
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