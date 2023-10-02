import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, Col, Row } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor"
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import { dashboardBlogVisitorData } from "../../../store/actions"
import { blodStatsData } from "common/data"

const IODecode = ({ dataColors }) => {
  const apexIODecodeChartColors = getChartColorsArray(dataColors)
  const [duration, setDuration] = useState("year")
  const dispatch = useDispatch()
  const visitorDurationData = duration => {
    setDuration(duration)
    dispatch(dashboardBlogVisitorData(duration))
  }

  useEffect(() => {
    dispatch(dashboardBlogVisitorData("year"))
  }, [dispatch])

  const selectDashboardblogState = state => state.DashboardBlog
  const DashboardblogProperties = createSelector(
    selectDashboardblogState,
    dashboardBlog => ({
      visitor: dashboardBlog.visitor,
    })
  )

  const { visitor } = useSelector(DashboardblogProperties)

  const series = [
    {
      name: "Current",
      data: visitor.Currentdata || [],
    },
    {
      name: "Previous",
      data: visitor.Previousdata || [],
    },
  ]

  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: apexIODecodeChartColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories: visitor.categories || [],
    },

    markers: {
      size: 3,
      strokeWidth: 3,

      hover: {
        size: 4,
        sizeOffset: 2,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  }

  return (
    <React.Fragment>
      <Col xl={7}>
        <Card>
          <CardBody>
            <h5 className="card-title me-2">IO Decode</h5>
            <hr className="mb-4" />
            <div id="area-chart" dir="ltr">
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
                className="apex-charts"
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

IODecode.propTypes = {
  options: PropTypes.any,
  series: PropTypes.any,
}

export default IODecode
