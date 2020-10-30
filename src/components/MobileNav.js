import React, {useState} from 'react';
//import { Link } from "gatsby";
import styled from 'styled-components';
//import { breakpoints } from '../utils/breakpoints';

const MobileNav = () => {

    //const [toggleHamburger,isToggled]=useState(false);

    return(
        <>
            <ButtonHamburger />
        </>
    )
}

export default MobileNav;


const ButtonHamburger = () => {
    return(
        <HamburgerBox>
            <div>
                <div />
                <div />
                <div />
            </div>
        </HamburgerBox>
    )
}

const HamburgerBox = styled.button`
    display:flex;
    justify-content:flex-end;
    div {
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        margin:0.5em;
        z-index:20;
        width:3.5em;
        height:3.5em;
        background:transparent;
        div {
            display:relative;
            width:100%;
            height:20%;
            background:#999999;
            border-radius:.25em;
        }
    }
`



