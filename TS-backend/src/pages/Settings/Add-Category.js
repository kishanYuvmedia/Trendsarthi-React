import React, { useState } from "react"
import {
  Table,
  Col,
  Row,
  Container,
  Label,
  Input,
  Button,
  Badge,
} from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CardView } from "../ui-components"
import {
  createMtSystemLists,
  deleteMtSystemLists,
  getSystemList
} from "../../services/api/api-service"
import SweetAlert from "react-bootstrap-sweetalert"
import { useEffect } from "react"
import { FcCancel } from "react-icons/fc"
import { isEmpty } from "lodash"
export default function AddCategory() {
  //meta title
  document.title = "Add Category | Trendsarthi"
  const [formData, setFormData] = useState({
    listType: "",
    label: "",
    value: "",
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [deleteStatus, setdeleteStatus] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [dataList, setDataList] = useState([])
  const handleChange = event => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
    getdata();
  }
  const handleSubmit = event => {
    event.preventDefault()
    if (!formData.label || !formData.value) {
      return
    }
    createMtSystemLists(formData).then(data => {
      setIsButtonDisabled(true)
      getdata()
    })
  }
  const deleteHander = id => {
    deleteMtSystemLists(id).then(result => {
      if (result.count) {
        setdeleteStatus(true)
        getdata()
      }
    })
  }
  function getdata() {
    console.log(formData);
    getSystemList(formData.listType).then(list => {
      if (!isEmpty(list)) {
        setDataList(list)
      }
    })
  }
  useEffect(() => {
    getSystemList("category").then(list => {
      console.log("system category list", list);
      if (!isEmpty(list)) {
        setCategoryList(list)
      }
    })
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Setting" breadcrumbItem="Add Category" />
          <Row>
            <Col md={12}>
              <CardView title="Add Category">
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={3}>
                      <div className="mb-3">
                        <Label htmlFor="formrow-label-Input">
                          Category Type
                        </Label>
                        <Input
                          id="exampleSelect"
                          name="listType"
                          type="select"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option >Select Category</option>
                          {categoryList.map((item, index) =>
                            <option key={index} value={item.value}>{item.label}</option>
                          )}
                        </Input>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-3">
                        <Label htmlFor="formrow-label-Input">Label</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="formrow-label-Input"
                          name="label"
                          placeholder="Enter Your Label ID"
                          value={formData.label}
                          onChange={handleChange}
                        />
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-3">
                        <Label htmlFor="formrow-value-Input">Value</Label>
                        <Input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          id="formrow-value-Input"
                          name="value"
                          placeholder="Enter Your Value"
                          value={formData.value}
                          onChange={handleChange}
                        />
                      </div>
                    </Col>
                    <Col md={3}>
                      <Button
                        type="submit"
                        className="btn btn-success mt-4"
                        disabled={isButtonDisabled}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </form>
              </CardView>
            </Col>
            <Col md={12}>
              <CardView title="List Category">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Sr.no</th>
                      <th>Type</th>
                      <th>Label</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.listType}</td>
                        <td>
                          <Badge
                            color="warning"
                            style={{ fontSize: 12, color: "black" }}
                          >
                            {item.label}
                          </Badge>
                        </td>
                        <td>
                          <Button onClick={() => deleteHander(item.id)}>
                            <FcCancel style={{ fontSize: 20 }} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardView>
            </Col>
          </Row>
        </Container>
      </div>
      {isButtonDisabled && (
        <SweetAlert
          style={{ backgroundColor: "black", color: "white" }}
          title="Category Add Successfully"
          onConfirm={() => setIsButtonDisabled(false)}
        >
          If you close this popup click "Ok" button
        </SweetAlert>
      )}
      {deleteStatus && (
        <SweetAlert
          style={{ backgroundColor: "black", color: "white" }}
          title="Delete Category Successfully"
          onConfirm={() => setdeleteStatus(false)}
        >
          If you close this popup click "Ok" button
        </SweetAlert>
      )}
    </React.Fragment>
  )
}
