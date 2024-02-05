import React from "react"
import { Card, CardBody, CardTitle, CardHeader } from "reactstrap"
export default function CardView(props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="h4">{props.title}</CardTitle>
      </CardHeader>
      <CardBody>{props.children}</CardBody>
    </Card>
  )
}
