import React from 'react'

import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Container,
} from "reactstrap"

const PCR = () => {
    return (
        <div>
            <Row>
                <Col xl={2}>
                    <Card>
                        <CardBody>
                            <CardTitle className="h4 text-center">PCR</CardTitle>
                            <div className="table-responsive">
                                <Table className="table mb-0 table-bordered ">

                                    <thead>
                                        <tr>
                                            <th>PCR</th>
                                            <th>PCR Strength</th>
                                        </tr>
                                    </thead>

                                    <tbody className='table-striped'>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Bearish</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PCR