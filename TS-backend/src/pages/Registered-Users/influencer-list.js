import React, { useEffect, useState } from "react"
import {
  Col,
  Row,
  Container,
  Badge,
  Input,
  FormGroup,
  Button,
} from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CardView, ModelBox } from "../ui-components"
import TableData from "pages/ui-components/table-data"
import {
  getProfileList,
  UpdateProfile,
  deleteProfile,
} from "services/api/api-service"
import { isEmpty, result } from "lodash"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
export default function InfluencerList() {
  const [data, setData] = useState({})
  const [modelValue, modelSetValue] = useState(false)
  const [viewdata, setviewdata] = useState({})
  const updatesHandler = data => {
    console.log(data)
    UpdateProfile(data).then(result => {
      if (!isEmpty(result)) {
        Swal.fire(
          "Status Update",
          "Influencer Profile Status Update successfuly",
          "success"
        )
        getdata()
      }
    })
  }
  const viewHandler = data => {
    console.log(data)
    if (!isEmpty(data)) {
      modelSetValue(true)
      setviewdata(data)
    }
  }
  function getdata() {
    getProfileList().then(result => {
      console.log("first", result)
      if (!isEmpty(result)) {
        console.log(result)
        const dataList = []
        result.map(list =>
          dataList.push({
            coverImage: (
              <img src={list.coverImage} className="rounded-circle avatar-sm" />
            ),
            regName: list.regName,
            fullName: list.fullName,
            categoryType: (
              <Badge color="warning" style={{ fontSize: 12, color: "black" }}>
                {list.categoryType}
              </Badge>
            ),
            businessNumber: list.businessNumber,
            businessEmail: list.businessEmail,
            status: (
              <FormGroup switch>
                <Input
                  type="switch"
                  checked={list.status === "A" ? true : false}
                  onChange={() =>
                    updatesHandler({
                      ...list,
                      ...{ status: list.status === "A" ? "I" : "A" },
                    })
                  }
                />
              </FormGroup>
            ),
            fetured: (
              <FormGroup switch>
                <Input
                  type="switch"
                  checked={list.Fetured === "A" ? true : false}
                  onChange={() =>
                    updatesHandler({
                      ...list,
                      ...{ Fetured: list.Fetured === "A" ? "I" : "A" },
                    })
                  }
                />
              </FormGroup>
            ),
            action: (
              <Button
                className="btn btn-success"
                onClick={() => viewHandler(list)}
              >
                View
              </Button>
            ),
          })
        )
        setData({
          columns: [
            {
              label: "Image",
              field: "coverImage",
              width: 100,
            },
            {
              label: "Short Name",
              field: "regName",
              sort: "asc",
              width: 270,
            },
            {
              label: "Full Name",
              field: "fullName",
              sort: "asc",
              width: 270,
            },
            {
              label: "Category",
              field: "categoryType",
              sort: "asc",
              width: 270,
            },
            {
              label: "Contact No.",
              field: "businessNumber",
              sort: "asc",
              width: 270,
            },
            {
              label: "Email",
              field: "businessEmail",
              sort: "asc",
              width: 100,
            },
            {
              label: "Status",
              field: "status",
              width: 100,
            },
            {
              label: "Fetured",
              field: "fetured",
              width: 100,
            },
            {
              label: "Action",
              field: "action",
              width: 100,
            },
          ],
          rows: dataList,
        })
      }
    })
  }
  const deleteprofile = id => {
    deleteProfile(id).then(result => {
      Swal.fire(
        "Delete successfully",
        "Influencer Profile Delete successfuly",
        "success"
      )
      getdata()
    })
  }
  useEffect(() => {
    getdata()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Influencer" breadcrumbItem="Influencer List" />
          <Row>
            <Col md={12}>
              <CardView title="Influencer List">
                <TableData tabledata={data} />
              </CardView>
            </Col>
          </Row>
        </Container>
      </div>
      <ModelBox
        modelValue={modelValue}
        sizeValue={"lg"}
        modelSetValue={modelSetValue}
        titleLabel="View Influencer Profile"
      >
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <tr>
              <th>Short Name</th>
              <td>{viewdata.regName}</td>
            </tr>
            <tr>
              <th>Full Name</th>
              <td>{viewdata.fullName}</td>
            </tr>
            <tr>
              <th>Platform</th>
              <td>{viewdata.categoryType}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{viewdata.category}</td>
            </tr>
            <tr>
              <th>Business Contact Number</th>
              <td>{viewdata.businessNumber}</td>
            </tr>
            <tr>
              <th>Business Email</th>
              <td>{viewdata.businessEmail}</td>
            </tr>
          </table>
          <hr />
          <Link
            to={`/influencer/add-Images-Vedio/${viewdata.id}`}
            className="btn btn-info mt-3"
          >
            Add Images and video
          </Link>
          <Button
            onClick={() => deleteprofile(viewdata.id)}
            className="btn btn-danger mt-3"
          >
            Delete
          </Button>
        </div>
      </ModelBox>
    </React.Fragment>
  )
}
