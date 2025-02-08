import React, { useEffect, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"

// //Import Scrollbar
import SimpleBar from "simplebar-react"
// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "components/Common/withRouter"
import { Link } from "react-router-dom"
//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active") // li
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove("mm-show") // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show") // li
                parent5.childNodes[0].classList.remove("mm-active") // a tag
              }
            }
          }
        }
      }
    }
  }

  const path = useLocation()
  const activeMenu = useCallback(() => {
    const pathName = path.pathname
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu("#side-menu")
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/dashboard">
                <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/home.png" alt="home" />
                <span className=" text-uppercase">{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("Navigation")} </li>
            <li>
              <Link to="/marketpulse">
                <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/heart-with-pulse.png" alt="heart-with-pulse" />
                <span>{props.t("Market Pulse")}</span>
              </Link>
            </li>
            <li>
              <Link to="/insiderstrategy">
                <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/hard-to-find.png" alt="hard-to-find" />
                <span>{props.t("Insider Strategy")}</span>
              </Link>
            </li>
            <li>
              <Link to="/sectorscope">
                <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" />
                <span>{props.t("Sector Scope")}</span>
              </Link>
            </li>
            <li>
              <Link to="/swingspectrum">
                <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/line-chart.png" alt="line-chart" />
                <span>{props.t("Swing Spectrum")}</span>
              </Link>
            </li>
            <li>
              <Link to="/optionclock">
                <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/alarm-clock--v1.png" alt="alarm-clock--v1" />
                <span>{props.t("Option Clock")}</span>
              </Link>
            </li>
            <li>
              <Link to="/optionapex">
                <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/combo-chart.png" alt="combo-chart" />
                <span>{props.t("Options Apex")}</span>
              </Link>
            </li>
            <li>
              <Link to="/indexmover">
                <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/candle-sticks.png" alt="candle-sticks" />
                <span>{props.t("Index Mover")}</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/radar.png" alt="radar" />
                <span>{props.t("Indicators")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">
                    <img className="me-3" width="20" height="20" src="https://img.icons8.com/isometric/50/vertical-timeline.png" alt="vertical-timeline" />
                    {props.t("Moving Avg.")}
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <img className="me-3" width="20" height="20" src="https://img.icons8.com/3d-fluency/94/cave.png" alt="cave" />
                    {props.t("Pivot Point")}
                  </Link>
                </li>

              </ul>
            </li>
            <hr />


            {/* <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("Derivatives")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/DerivativeDashboard">{props.t("Dashboard")}</Link>
                </li>
                <li>
                  <Link to="/NiftyOptionChain">{props.t("NIFTY")}</Link>
                </li>
                <li>
                  <Link to="/BankNiftyOptionChain">{props.t("BANKNIFTY")}</Link>
                </li>
                <li>
                  <Link to="/FinNiftyOptionChain">{props.t("FINNIFTY")}</Link>
                </li>
                <li>
                  <Link to="/MidCapOptionChain">{props.t("MIDCAP")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("MustWatch")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/mustwatch">{props.t("FNO Ranking")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/Indicator-chart">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Indicator Chart")}</span>
              </Link>
            </li>
            <li>
              <Link to="/delivery-average-scanner">
                <i className="bx bx-file"></i>
                <span>{props.t("Delivery Average Scanner")}</span>
              </Link>
            </li> */}

          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
