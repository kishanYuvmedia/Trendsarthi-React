import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHome, faEllipsis, faSquarePollVertical, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
const tabs = [

    {
        route: "/marketpulse",
        icon: 'https://img.icons8.com/3d-fluency/94/heart-with-pulse.png',
        label: "Pulse"
    },
    {
        route: "/insiderstrategy",
        icon: 'https://img.icons8.com/3d-fluency/94/hard-to-find.png',
        label: "Strategy"
    },
    {
        route: "/dashboard",
        icon: 'https://img.icons8.com/3d-fluency/94/home.png',
        label: "Home"
    },
    {
        route: "/sectorscope",
        icon: 'https://img.icons8.com/3d-fluency/94/statistic.png',
        label: "Scope"
    },

    {
        route: "/swingspectrum",
        icon: 'https://img.icons8.com/3d-fluency/94/line-chart.png',
        label: "Spectrum"
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
                                    <NavLink to={tab.route} className="nav-link bottom-nav-link p-0" activeClassName="active">
                                        <div className="row d-flex flex-column align-items-center text-center">
                                            <img className=""  src={tab.icon} alt="tab-icons" style={{width: "35%"}} />
                                            <div className="bottom-tab-label fw-bold">{tab.label}</div>
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
