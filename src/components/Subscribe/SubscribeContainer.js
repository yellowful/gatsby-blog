import React from 'react'
import Subscribe from './Subscribe'
import MediaLinks from "./MediaLinks/MediaLinks"


const SubscribeContainer = () => {
    return (
        <footer className="w-100 bg-moon-gray">
            <div className="w-100 w-90-m w80-l center columns is-desktop">
                <section className="column is-9-desktop">
                    <Subscribe />
                </section>
                <section className="column is-3-desktop">
                    <MediaLinks />
                </section>
            </div>
        </footer>
    )
}

export default SubscribeContainer
