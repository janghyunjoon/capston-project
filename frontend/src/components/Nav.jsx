import React from 'react'
import useSmoothScroll from '../hook/useSmoothScroll'
import './Nav.css'
const Nav = () => {
    const navLink = ['Hero', 'Contact', 'Work', 'Aboutme']

    const scrollTo = useSmoothScroll()
    return (
        
        <nav>
            <ul>
                {navLink.map((nav, i) => (
                    <li key={i}>
                        <a
                            onClick={(e) => {
                                e.preventDefault()
                                scrollTo(nav)
                            }}
                            href={`#${nav}`}>
                            {nav}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav