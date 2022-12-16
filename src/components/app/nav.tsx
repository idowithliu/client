import * as React from "react";
import { Link } from "react-router-dom";

const NavItem = (props: { href: string, children: string }): JSX.Element => {
    return (
        <li className="nav-item">
            <Link to={props.href} className="nav-link">
                <span className="nav-desc">
                    {props.children}
                </span>
            </Link>
        </li>
    );
}

export const NavBar = (): JSX.Element => {
    return (
        <nav className="nav">
            <div className="navbar">
                <ul className="nav-list">
                    <NavItem href="/">Home</NavItem>
                    <NavItem href="/rsvp">RSVP</NavItem>
                    <NavItem href="/about">Our Story</NavItem>
                    <NavItem href="/faq">Q & A</NavItem>
                    <NavItem href="/registry">Registry</NavItem>
                </ul>
            </div>
        </nav>
    );
}