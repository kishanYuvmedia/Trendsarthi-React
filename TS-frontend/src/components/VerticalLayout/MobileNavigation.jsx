import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHome, faEllipsis, faSquarePollVertical, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
const tabs = [

    {
        route: "/marketpulse",
        icon: faSquarePollVertical,
        label: "Stocks"
    },
    {
        route: "/marketpulse",
        icon: faChartLine,
        label: "F&O"
    },
    {
        route: "/marketpulse",
        icon: faHome,
        label: "Home"
    },
    {
        route: "/marketpulse",
        icon: faScrewdriverWrench,
        label: "Tools"
    },

    {
        route: "/marketpulse",
        icon: faEllipsis,
        label: "More"
    }
]

export default function MobileNavigation() {

    return (
        <div>
            {/* Bottom Tab Navigator*/}
            <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav bg-black border-0 border-secondary border-top border-3 rounded-3" role="navigation">
                <Nav className="w-100">
                    <div className=" d-flex flex-row justify-content-around w-100">
                        {
                            tabs.map((tab, index) => (
                                <NavItem key={`tab-${index}`}>
                                    <NavLink to={tab.route} className="nav-link bottom-nav-link px-0" activeClassName="active">
                                        <div className="row d-flex flex-column justify-content-center align-items-center">
                                            <FontAwesomeIcon size="lg" icon={tab.icon} />
                                            <div className="bottom-tab-label">{tab.label}</div>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            ))
                        }
                    </div>
                </Nav>
            </nav>
        </div>
    );
}
