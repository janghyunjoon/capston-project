import React, { useState } from 'react'
import useSmoothScroll from '../hook/useSmoothScroll'
import './Nav.css'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLink = ['새소식', '고객센터', 'Work', 'Aboutme']
    const scrollTo = useSmoothScroll()
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScrollAndClose = (nav) => {
        scrollTo(nav);
        setIsOpen(false);
    }

    return (
        <nav className={isOpen ? 'nav-open' : ''}> 
            
            <button className="nav-toggle" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <ul className="nav-list"> 
                {navLink.map((nav, i) => (
                    <li key={i} onClick={() => setIsOpen(false)}>
                        <a
                            onClick={(e) => {
                                e.preventDefault()
                                handleScrollAndClose(nav)
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