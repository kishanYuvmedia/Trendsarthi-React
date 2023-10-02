import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { withTranslation } from "react-i18next"
const Dashboard = props => {
  document.title = "Dashboard | Scalping- React Admin & Dashboard Template"
  return <React.Fragment></React.Fragment>
}
Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
