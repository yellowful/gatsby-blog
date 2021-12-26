import React from "react"
import Subscribe from "./Subscribe"
import MediaLinks from "./MediaLinks/MediaLinks"

//用來裝Subscribe和MediaLinks
//放在index page和 about page之中
const SubscribeContainer = () => {
  return (
    <footer className="w-100 bg-moon-gray pt2">
      <div className="w-100 w-90-m w80-l center columns is-desktop">
        <section key="subscribe-container-main" className="column is-9-desktop">
          <Subscribe />
        </section>
        <section key="subscribe-container-link" className="column is-3-desktop">
          <MediaLinks />
        </section>
      </div>
    </footer>
  )
}

export default SubscribeContainer
