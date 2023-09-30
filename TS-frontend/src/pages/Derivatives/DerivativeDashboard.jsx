import React from "react"
import { Container, Row } from "reactstrap"

//import component
import IODecode from "./DashboardComponents/IODecode"
import Settings from "./DashboardComponents/FilterTabs"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const index = () => {
  //meta title
  document.title = "Derivative Dashboard"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Derivative"
            breadcrumbItem="Derivative Dashboard"
          />
          <Row>
            {/* IO Decode Chart */}
            <IODecode dataColors='["--bs-primary", "--bs-danger"]' />

            {/* Nifty bankNifty btns */}
            <Settings />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default index
