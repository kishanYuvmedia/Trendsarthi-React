import React, { useState } from "react"
import { Table, Col, Row, Container, Label, Input, Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CardView } from "../ui-components"
import {
  getPublicList,
  createProfileListing,
  checkPublicName,
} from "../../services/api/api-service"
import Select from "react-select"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { MultiSelect } from "react-multi-select-component"
import Swal from "sweetalert2"
export default function AddInfluencer(props) {
  const navigate = useNavigate()
  document.title = "Add Category | Marbiz"
  const [formData, setFormData] = useState({
    categoryType: "",
    fullName: "",
    regName: "",
    category: [],
    businessNumber: "",
    about: "",
    bio: "",
    businessEmail: "",
    coverImage: "",
    idProofType: "",
    idProofNo: "",
    location: "",
    status: "A",
    mtUserId: "",
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [platformList, setplatformList] = useState([])
  const [documentList, setdocumentList] = useState([])
  const [selected, setSelected] = useState([])
  const [categoryList, setcategoryList] = useState([])
  const [imgeurl, setUlr] = useState("")
  const [selectdoctype, setdoctype] = useState("")
  const [selectCategory, setSelectedCategory] = useState("")
  const [regerror, setregerror] = useState({
    status: "3",
    message: "new",
  })
  const handleChange = event => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (formData.regName != null && name == "regName") {
      checkPublicName(value)
        .then(result => {
          console.log("API Response:", result) // Log the response for debugging
          if (result && result.count !== undefined) {
            if (result.count > 0) {
              setregerror({
                status: "0",
                message: "Already taken any one",
              })
            } else {
              setregerror({ status: "1", message: "Available" })
            }
          } else {
            setregerror({ status: "0", message: "Already taken any one" })
          }
        })
        .catch(error => {
          console.error("API Error:", error) // Log any API errors
          setregerror({ status: "0", message: "Already taken any one" })
        })
    }
  }
  const handleSubmit = event => {
    event.preventDefault()
    if (!formData.businessNumber || !formData.fullName) {
      return
    }
    const listMulti = []
    if (Array.isArray(selected)) {
      selected.map(item => listMulti.push(item.label))
    } else {
      // Handle the case when 'selected' is not an array or is undefined
      console.error("'selected' is not an array or is undefined")
    }
    const data = []
    data.push({
      categoryType: selectCategory,
      fullName: formData.fullName,
      regName: formData.regName,
      category: listMulti,
      businessNumber: formData.businessNumber,
      about: formData.about,
      bio: formData.bio,
      businessEmail: formData.businessEmail,
      coverImage: imgeurl,
      idProofType: selectdoctype,
      idProofNo: formData.idProofNo,
      location: formData.location,
      status: "A",
      mtUserId: "1",
    })
    createProfileListing(data).then(result => {
      if (result) {
        Swal.fire(
          "Add Influencer Profile",
          "Influencer Profile upload successfuly",
          "success"
        )
        navigate(`/`, {
          replace: true,
        })
      }
    })
  }
  useEffect(() => {
    getPublicList("Platform").then(result => {
      setplatformList(result)
    })
    getPublicList("Document").then(result => {
      setdocumentList(result)
    })
    getPublicList("Category").then(result => {
      setcategoryList(result)
    })
  }, [])
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ]
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file)
        setErrorMessage("")

        // Create a FileReader to read the selected file
        const reader = new FileReader()
        reader.onload = e => {
          setImagePreview(e.target.result) // Set the imagePreview state with the data URL
        }
        reader.readAsDataURL(file)
      } else {
        setSelectedFile(null)
        setErrorMessage("Please select a valid image file (jpg, jpeg, or png).")
        setImagePreview(null) // Clear the image preview
      }
    }
  }

  const handleUpload = async () => {
    if (selectedFile) {
      const formDataImage = new FormData()
      formDataImage.append("image", selectedFile, "compressed-image.jpg") // You can set the filename here
      fetch("https://marbiz.yuvmedia.in/upload.php", {
        method: "POST",
        body: formDataImage,
      })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
          if (data) {
            Swal.fire(
              "Cover Image",
              "Your cover page updated successfully",
              "success"
            )
            setUlr(data.imageUrl)
            setImagePreview(data.imageUrl)
            console.log(data.imageUrl)
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong please Retry uploading Image",
            })
          }
        })
        .catch(error => {
          // Handle any errors
          console.error(error)
        })
    }
  }
  function handleMulti(e) {
    setSelected(e.label)
  }
  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Influencer" breadcrumbItem="Add Influencer" />
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
                            id="categoryType"
                            name="categoryType"
                            type="select"
                            value={selectCategory}
                            onChange={e => {
                              setSelectedCategory(e.target.value)
                            }}
                          >
                            {platformList.map(list => (
                              <option key={list.label}>{list.label}</option>
                            ))}
                          </Input>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-label-Input">FullName</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-fullName-Input"
                            name="fullName"
                            placeholder="Enter Your full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-label-Input">
                            Profile Name
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-regName-Input"
                            name="regName"
                            placeholder="Enter Your Profile Name"
                            value={formData.regName}
                            onChange={handleChange}
                          />
                          {regerror.status != 3 && (
                            <p
                              style={
                                regerror.status == 0
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                            >
                              {regerror.message}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-businessNumber-Input">
                            Business Number
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            id="formrow-businessNumber-Input"
                            name="businessNumber"
                            placeholder="Enter business number Value"
                            value={formData.businessNumber}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-businessEmail-Input">
                            Business Email
                          </Label>
                          <Input
                            type="email"
                            className="form-control"
                            autoComplete="off"
                            id="formrow-businessEmail-Input"
                            name="businessEmail"
                            placeholder="Enter business email Value"
                            value={formData.businessEmail}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-idProofType-Input">
                            Id Proof Type
                          </Label>
                          <Input
                            id="idProofType"
                            name="idProofType"
                            type="select"
                            value={selectdoctype}
                            onChange={e => {
                              setdoctype(e.target.value)
                            }}
                          >
                            {documentList.map(list => (
                              <option key={list.label}>{list.label}</option>
                            ))}
                          </Input>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-idProofNo-Input">
                            ID Number
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            id="formrow-idProofNo-Input"
                            name="idProofNo"
                            placeholder="Enter Id Proof No"
                            value={formData.idProofNo}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-location-Input">
                            Location
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            id="formrow-location-Input"
                            name="location"
                            placeholder="Enter location"
                            value={formData.location}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-category-Input">
                            category
                          </Label>
                          <Select
                            value={selected}
                            isMulti={true}
                            name="category"
                            onChange={e => handleMulti(e)}
                            options={categoryList}
                            className="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-bio-Input">Bio</Label>
                          <Input
                            type="textarea"
                            className="form-control"
                            autoComplete="off"
                            id="formrow-bio-Input"
                            name="bio"
                            placeholder="Enter bio"
                            value={formData.bio}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-about-Input">About</Label>
                          <Input
                            type="textarea"
                            className="form-control"
                            autoComplete="off"
                            id="formrow-about-Input"
                            name="about"
                            placeholder="Enter about"
                            value={formData.about}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3" style={{ display: "flex" }}>
                          <Label htmlFor="formrow-about-Input">
                            Upload Your Profile Image
                          </Label>
                          <Input
                            type="file"
                            className="form-control"
                            autoComplete="off"
                            id="formrow-coverImage-Input"
                            name="imagesselect"
                            placeholder="Enter coverImage"
                            style={{ height: 38 }}
                            onChange={handleFileChange}
                          />
                          <Button
                            type="button"
                            className="btn btn-info"
                            style={{ height: 38, width: 200 }}
                            onClick={handleUpload}
                          >
                            Upload Image
                          </Button>
                        </div>
                      </Col>
                      <Col md={3}>
                         
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Img Preview"
                            name="coverImage"
                            className="img-fluid"
                          />
                        )}
                      </Col>

                      <Col md={12}>
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
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </div>
  )
}
