import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


const BuyMeACoffee = () => {

    return (
        <div className="w-100 tc mb2 mt2 mt2-m mt4-l">
            {/*eslint-disable-next-line*/}
            <a href="https://www.buymeacoffee.com/bugdetective" target="_blank" rel="noopener"> 
                <button className="button is-dark is-small">
                    <FontAwesomeIcon icon={faCoffee} />
                    <span className="ml2">Buy me a coffee</span>
                </button >
            </a>
        </div >
    )
}

export default BuyMeACoffee
