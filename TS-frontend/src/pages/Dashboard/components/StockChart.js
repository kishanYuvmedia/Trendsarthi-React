import React, { useEffect, useState } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import * as am5stock from "@amcharts/amcharts5/stock"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import "./chartstyle.css"
const StockChart = ({dataList}) => {
  const [root, setRoot] = useState(null)
  useEffect(() => {
    const chartRoot = am5.Root.new("chartdiv")
    chartRoot.interfaceColors.set("grid", am5.color(0xffffff))
    chartRoot.interfaceColors.set("text", am5.color(0xffffff))
    // Set themes
    chartRoot.setThemes(chartRoot, am5themes_Animated)

    // Create a stock chart
    const stockChart = chartRoot.container.children.push(
      am5stock.StockChart.new(chartRoot, {})
    )
    // Set global number format
    chartRoot.numberFormatter.set("numberFormat", "#,###.00")

    //
    // Main (value) panel
    //

    // Create a main stock panel (chart)
    const mainPanel = stockChart.panels.push(
      am5stock.StockPanel.new(chartRoot, {
        wheelY: "zoomX",
        panX: true,
        panY: true,
        height: am5.percent(70),
      })
    )

    // Create axes
    const valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(chartRoot, {
        renderer: am5xy.AxisRendererY.new(chartRoot, {
          pan: "zoom",
        }),
        tooltip: am5.Tooltip.new(chartRoot, {}),
        numberFormat: "#,###.00",
        extraTooltipPrecision: 2,
      })
    )

    const dateAxis = mainPanel.xAxes.push(
      am5xy.GaplessDateAxis.new(chartRoot, {
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        groupData: true,
        renderer: am5xy.AxisRendererX.new(chartRoot, {}),
        tooltip: am5.Tooltip.new(chartRoot, {}),
      })
    )

    // Add series
    const valueSeries = mainPanel.series.push(
      am5xy.CandlestickSeries.new(chartRoot, {
        name: "MSFT",
        valueXField: "Date",
        valueYField: "Close",
        highValueYField: "High",
        lowValueYField: "Low",
        openValueYField: "Open",
        calculateAggregates: true,
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText: "{valueY}",
      })
    )

    // Set main value series
    stockChart.set("stockSeries", valueSeries)

    // Add a stock legend
    const valueLegend = mainPanel.plotContainer.children.push(
      am5stock.StockLegend.new(chartRoot, {
        stockChart: stockChart,
      })
    )
    valueLegend.data.setAll([valueSeries])

    // Add cursor(s)
    mainPanel.set(
      "cursor",
      am5xy.XYCursor.new(chartRoot, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        snapToSeries: [valueSeries],
        snapToSeriesBy: "y!",
      })
    )

    // Add scrollbar
    const scrollbar = mainPanel.set(
      "scrollbarX",
      am5xy.XYChartScrollbar.new(chartRoot, {
        orientation: "horizontal",
        height: 100,
      })
    )
    stockChart.toolsContainer.children.push(scrollbar)

    const sbDateAxis = scrollbar.chart.xAxes.push(
      am5xy.GaplessDateAxis.new(chartRoot, {
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(chartRoot, {}),
      })
    )

    const sbValueAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(chartRoot, {
        renderer: am5xy.AxisRendererY.new(chartRoot, {}),
      })
    )

    const sbSeries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(chartRoot, {
        valueYField: "Close",
        valueXField: "Date",
        xAxis: sbDateAxis,
        yAxis: sbValueAxis,
      })
    )

    sbSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3,
    })

    // Function that dynamically loads data
    const loadData = (ticker, series) => {
      am5.net
        .load(
          `https://www.amcharts.com/wp-content/uploads/assets/docs/stock/${ticker}.csv`
        )
        .then(result => {
          console.log("result", result)
          const data = am5.CSVParser.parse(result.response, {
            delimiter: ",",
            skipEmpty: true,
            useColumnNames: true,
          })
          console.log("result-data", dataList)
          const processor = am5.DataProcessor.new(chartRoot, {
            dateFields: ["Date"],
            dateFormat: "yyyy-MM-dd",
            numericFields: [
              "Open",
              "High",
              "Low",
              "Close",
              "Adj Close",
              "Volume",
            ],
          })
          processor.processMany(dataList)

          am5.array.each(series, item => {
            item.data.setAll(dataList)
          })
        })
    }

    // Load initial data for the first series
    loadData("MSFT", [valueSeries, sbSeries])

    // Stock toolbar
    const toolbar = am5stock.StockToolbar.new(chartRoot, {
      container: document.getElementById("chartcontrols"),
      stockChart: stockChart,
      controls: [
        am5stock.IndicatorControl.new(chartRoot, {
          stockChart: stockChart,
          legend: valueLegend,
        }),
        am5stock.DateRangeSelector.new(chartRoot, {
          stockChart: stockChart,
        }),
        am5stock.PeriodSelector.new(chartRoot, {
          stockChart: stockChart,
        }),
        am5stock.DrawingControl.new(chartRoot, {
          stockChart: stockChart,
        }),
        am5stock.ResetControl.new(chartRoot, {
          stockChart: stockChart,
        }),
        am5stock.SettingsControl.new(chartRoot, {
          stockChart: stockChart,
        }),
      ],
    })
    setRoot(chartRoot)
    // Clean up when component unmounts
    return () => {
      if (chartRoot) {
        chartRoot.dispose()
      }
    }
  }, [dataList]) // Empty dependency array to run the effect only once

  return (
    <>
      <div
        id="chartcontrols"
        style={{ height: "auto", padding: "5px 45px 0 15px", maxWidth: "100%" }}
      ></div>

      <div
        id="chartdiv"
        style={{
          width: "100%",
          height: "600px",
          maxWidth: "100%",
        }}
      ></div>
    </>
  )
}

export default StockChart
