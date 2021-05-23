import React from "react"

//在indexpage中，用來裝cards的container
const CardList = props => {
  return (
    <section className="w-100 mt2 flex flex-column items-center has-background-light">
      <header className="w-100 w-90-m w-80-l mw8 ph3-ns mv2-ns pa2">
        <h2 className="f3 is-dark">最新文章</h2>
      </header>
      <section className="w-100 w-90-m w-80-l mw8 index-card-container pa3-ns pa2">
        {props.children}
      </section>
    </section>
  )
}

export default CardList
