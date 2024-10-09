import React, { useState } from 'react';

export default function MobileMenu({ links }) {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="mobile-menu">
            <div className="menu-toggle" onClick={toggleMenu}>
                <div className={`hamburger ${menuOpen ? 'open' : ''}`}></div>
            </div>
            <ul className={`mainmenu ${menuOpen ? 'open' : ''}`}>
                {links && links.map((el, index) => (
                    <li key={index} className="has-dropdown" onClick={() => toggleDropdown(index)}>
                        {el.name}
                        {el.submenu && (
                            <ul className={`submenu ${activeDropdown === index ? 'active' : ''}`}>
                                {el.submenu.map((item, subIndex) => (
                                    <li key={subIndex}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
