import React, { Component } from 'react'
import flush from './flush.js'

export class BuyMeAbook extends Component {
    constructor(props) {
        super(props)
        document.head.removeChild(this.script);
        var script = document.createElement("script");
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
        script.setAttribute("data-name","BMC-Widget")
        script.setAttribute("data-cfasync","true")
        script.setAttribute("data-id","bugdetective")
        script.setAttribute("data-description","Support me on Buy me a coffee!")
        script.setAttribute("data-message","")
        script.setAttribute("data-color","#ff813f")
        script.setAttribute("data-position","Right")
        script.setAttribute("data-x_margin","18")
        script.setAttribute("data-y_margin","18")
        script.async = true
        script.onload=function(){
            var evt = document.createEvent('Event');  
            evt.initEvent('DOMContentLoaded', false, false);  
            window.dispatchEvent(evt);
        }
        this.script=script
    }
    componentDidMount () {    
        document.head.appendChild(this.script)
        console.log('coffee did mount',this.props.BuyMeAbook)
    }

    componentWillUnmount(){
        //var iframes = document.querySelectorAll('iframe');
        document.head.removeChild(this.script);
        var script = document.createElement("script");
        script.src = flush;
        document.head.appendChild(flushFile);
        const icon = document.getElementById("bmc-wbtn")
        const previousDiv = icon.previousSibling
        const nextDiv = icon.nextSibling
        // const nextNextDiv = nextDiv.nextSibling
        //var nextDiv = document.body.querySelectorAll('div[opacity="0"]');
        document.body.removeChild(previousDiv)
        //document.body.removeChild(nextNextDiv)
        document.body.removeChild(nextDiv)
        document.body.removeChild(icon)
        console.log('coffee will unmount',this.props.BuyMeAbook)
     }


    render(){
        return(null)
    }
}

export default BuyMeAbook