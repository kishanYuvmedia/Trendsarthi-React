import React from "react"
import { Container, Row, Col } from "reactstrap"
import { FNO } from "./Section/fno";
import Breadcrumbs from "../../components/Common/Breadcrumb"
export const Mustwatch = ({ props }) => {
    return (<>
      <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Home"
            breadcrumbItem="FNO Ranking"
          />
          <Row>
            <Col md={12}>
                <FNO/>
            </Col>
        </Row>
        </Container>
        </div>
        </React.Fragment>
    </>);
}
