import React from 'react';
import { Link } from "gatsby";
import styled from 'styled-components';
import { breakpoints } from '../utils/breakpoints';

const DesktopNav = () => {
    return(
        <>
            <StyledNav>
                <ul>
                    <li>
                        <Link to="/">blog</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li>
                        <Link to="/project">project</Link>
                    </li>
                    <li>
                        <Link to="/gallery">gallery</Link>
                    </li>
                </ul>
            </StyledNav>
        </>
    )
}

export default DesktopNav;

const StyledNav = styled.nav`
    display:none;
    @media ${breakpoints.l} {
        display:block;
        background: #333333;
        width: 100%;
        height: 3em;
        vertical-align:middle;
        z-index:10;
            ul {
                height:100%;
                width:100%;
                list-style:none;
                display:flex;        
                justify-content:space-around;
                align-items:center;
                margin:0;
                li {  
                    margin:0;          
                    a {
                        color:#EEEEEE;
                        text-decoration:none;            
                    }
                }
            }        
    }
`



