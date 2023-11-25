import React from "react"
import { Link } from "react-router-dom"
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa"
import { Card, CardHeader, CardBody } from "reactstrap"
import { useState } from "react"
export default function CardDrag({ header, children,cssStyle }) {
  const [light, setlight] = useState(false)
  return (
    <div>
      <Card className="my-2 Drag" style={cssStyle}>
        <CardHeader className={`${light ? "bgbackgroundblue" : ""}`}>
          <strong className="text-white">{header}</strong>{" "}
          <Link
            className={`float-end`}
            onClick={() => setlight(light ? false : true)}
          >
            {light ? (
              <FaLightbulb color="white" />
            ) : (
              <FaRegLightbulb color="white" />
            )}
          </Link>
        </CardHeader>
        <CardBody>
          <>{children}</>
        </CardBody>
      </Card>
    </div>
  )
}
