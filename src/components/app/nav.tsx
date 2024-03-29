import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavRoute } from "../../util/models";

export const NavBar = (): JSX.Element => {
    const routes: Array<NavRoute> = [
        { id: 1, url: "/", text: "Home" },
        { id: 2, url: "/about", text: "Our Story" },
        { id: 3, url: "/schedule", text: "Schedule" },
        { id: 4, url: "/faq", text: "FAQs" },
        { id: 5, url: "/photos", text: "Photo Gallery" },
        // { id: 5, url: "/rsvp", text: "RSVP" },
        { id: 6, url: "/registry", text: "Registry" },
    ];

    const NavItem = (props: { href: string, children: string }): JSX.Element => {
        const location = useLocation();
        const route: string = location.pathname;

        return (
            <li className="nav-item">
                <Link to={props.href} className="nav-link">
                    <span className={route === props.href ? "nav-active" : "nav-inactive"}>
                        {props.children}
                    </span>
                </Link>
            </li>
        );
    }

    return (
        <nav className="nav">
            <div className="navbar">
                <ul className="nav-list">
                    {routes.map((route: NavRoute): JSX.Element => {
                        return <NavItem key={route.id} href={route.url}>{route.text}</NavItem>
                    })}
                </ul>
            </div>
        </nav>
    );
}