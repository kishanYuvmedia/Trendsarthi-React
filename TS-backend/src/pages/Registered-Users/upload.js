import React, { useEffect, useState } from "react"
import {
  Col,
  Container,
  Card,
  Form,
  Button,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,Input
} from "reactstrap"
import Dropzone from "react-dropzone"
//Import Breadcrumb
import Swal from "sweetalert2"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CardView } from "../ui-components"
import {
  UploadbulkImages,
  getImagesList,
  UpdateProfile,
  getProfile,
  deleteImages,
  getPublicList
} from "services/api/api-service"
import Lightbox from "react-image-lightbox"
import { useParams, Link } from "react-router-dom"
import "react-image-lightbox/style.css"
import classnames from "classnames"
import defaultImges from "../../assets/image/default-image.jpg"
import _, { isEmpty } from "lodash"
export default function Upload() {
  const [typelist,setTypeList]=useState([]);
  const [selectedType,setSelectedType]=useState([]);
  const [profile, setprofile] = useState(null)
  const [selectedImage1, setSelectedImage1] = useState(null)
  const [selectedImage2, setSelectedImage2] = useState(null)
  const [selectedImage3, setSelectedImage3] = useState(null)
  const [selectedImage4, setSelectedImage4] = useState(null)
  const [selectedfile1, setSelectedfile1] = useState(null)
  const [selectedfile2, setSelectedfile2] = useState(null)
  const [selectedfile3, setSelectedfile3] = useState(null)
  const [selectedfile4, setSelectedfile4] = useState(null)
  let { profileId } = useParams()
  const [isGallery, setisGallery] = useState(false)
  const [photoIndex, setphotoIndex] = useState(0)
  const [selectedFiles, setselectedFiles] = useState([])
  const [images, setImages] = useState([])
  const [activeTab, setactiveTab] = useState("1")
  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
  const HandlerUpload = async () => {
    const uploadPromises = []
    for (const file of selectedFiles) {
      const formDataImage = new FormData()
      formDataImage.append("image", file, "compressed-image.jpg")
      const uploadPromise = fetch("https://marbizimages.yuvmedia.in/upload.php", {
        method: "POST",
        body: formDataImage,
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            return UploadbulkImages({
              src: data.imageUrl,
              original: data.imageUrl,
              caption: "Images",
              profileId: profileId,
              status: "A",
            }).then(data => {
              console.log("Images - ", data.src)
            })
          } else {
            return Promise.reject(
              "Something went wrong while uploading an image"
            )
          }
        })
      uploadPromises.push(uploadPromise)
    }
    Promise.all(uploadPromises)
      .then(() => {
        Swal.fire(
          "Cover Image",
          "Your cover page updated successfully",
          "success"
        )
        getImagedata()
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error || "Something went wrong, please retry uploading images",
        })
      })
  }
  const deleteProfileImages = id => {
    deleteImages(id).then(result => {
      if (result) {
        Swal.fire(
          "Delete Image successfully",
          "Influencer Image Delete successfuly",
          "success"
        )
        getImagedata()
      }
    })
  }
  const getImagedata = () => {
    getImagesList(profileId)
      .then(resultdb => {
        setTimeout(() => {
          setImages(resultdb) // Use placeholder data
        }, 1000)
        console.log("images", images)
      })
      .catch(err => {
        console.error("Error fetching profile data:", err)
      })
    getProfile(profileId)
      .then(resultdb => {
        console.log("image Profile", resultdb)
        setprofile(resultdb)
        setSelectedImage1(
          _.get(resultdb, "image1") ? resultdb.image1 : defaultImges
        )
        setSelectedImage2(
          _.get(resultdb, "image2") ? resultdb.image2 : defaultImges
        )
        setSelectedImage3(
          _.get(resultdb, "image3") ? resultdb.image3 : defaultImges
        )
        setSelectedImage4(
          _.get(resultdb, "image4") ? resultdb.image4 : defaultImges
        )
      })
      .catch(err => {
        console.error("Error fetching profile data:", err)
      })
  }
  useEffect(() => {
    getImagedata()
    getPublicList("Content Type").then((result) => {
      setTypeList(result);
  });
  }, [])
  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }
  const handleImageChange1 = e => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setSelectedImage1(e.target.result)
        setSelectedfile1(file)
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedImage1(null)
      setSelectedfile1(null)
    }
  }
  const handleImageChange2 = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setSelectedImage2(e.target.result)
        setSelectedfile2(file)
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedImage2(null)
      setSelectedfile2(null)
    }
  }
  const handleImageChange3 = e => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setSelectedImage3(e.target.result)
        setSelectedfile3(file)
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedImage3(null)
      setSelectedfile3(null)
    }
  }
  const handleImageChange4 = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setSelectedfile4(file)
        setSelectedImage4(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedImage4(null)
      setSelectedfile4(null)
    }
  }
  const uploadfile = async (file, setSelectedImage) => {
    if (file) {
      const formDataImage = new FormData()
      formDataImage.append("image", file, "compressed-image.jpg")
      try {
        const response = await fetch("https://marbizimages.yuvmedia.in/upload.php", {
          method: "POST",
          body: formDataImage,
        })
        const data = await response.json()
        if (data) {
          console.log(data)
          setSelectedImage(data.imageUrl)
          return true
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong please Retry uploading Image",
          })
          return false
        }
      } catch (error) {
        // Handle any errors
        console.error(error)
        return false
      }
    }
    return false // Return false if there's no file to upload
  }

  const handleUpload = async () => {
    const promises = [
      uploadfile(selectedfile1, setSelectedImage1),
      uploadfile(selectedfile2, setSelectedImage2),
      uploadfile(selectedfile3, setSelectedImage3),
      uploadfile(selectedfile4, setSelectedImage4),
    ]

    const results = await Promise.all(promises)
    console.log("results", results)

    if (results.every(result => result === true)) {
      const data = {
        image1: selectedImage1,
        image2: selectedImage2,
        image3: selectedImage3,
        image4: selectedImage4,
        ...profile,
      }
      console.log(data)

      UpdateProfile(data).then(result => {
        if (!isEmpty(result)) {
          Swal.fire(
            "Upload successfully",
            "Cover Page Images added successfully",
            "success"
          )
          getImagedata()
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please retry uploading images.",
      })
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Influencer"
            breadcrumbItem="Add Influencer Images and vedios"
          />
          <Row>
            <Col md={12}>
              <CardView title="Add Images and vedios">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "1",
                      })}
                      onClick={() => {
                        toggle("1")
                      }}
                    >
                      Upload Gallery Images
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "2",
                      })}
                      onClick={() => {
                        toggle("2")
                      }}
                    >
                      Cover Images
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab} className="p-3 text-muted">
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <Form>
                        {/* <Input
                            id="type"
                            name="type"
                            className="mb-2 w-50"
                            type="select"
                            value={selectedType}
                            onChange={e => {
                              setSelectedType(e.target.value)
                            }}
                          >
                            {typelist.map(list => (
                              <option key={list.label}>{list.label}</option>
                            ))}
                          </Input> */}
                          <Dropzone
                            onDrop={acceptedFiles => {
                              handleAcceptedFiles(acceptedFiles)
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick mt-2"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <div className="mb-3">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            <Row>
                              <Col md={12}>
                                {selectedFiles.map((f, i) => {
                                  return (
                                    <Card
                                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                      key={i + "-file"}
                                    >
                                      <div className="p-2">
                                        <Row className="align-items-center">
                                          <Col className="col-auto">
                                            <img
                                              data-dz-thumbnail=""
                                              height="80"
                                              className="avatar-sm rounded bg-light"
                                              alt={f.name}
                                              src={f.preview}
                                            />
                                          </Col>
                                          <Col>
                                            <Link
                                              to="#"
                                              className="text-muted font-weight-bold"
                                            >
                                              {f.name}
                                            </Link>
                                            <p className="mb-0">
                                              <strong>{f.formattedSize}</strong>
                                            </p>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Card>
                                  )
                                })}
                              </Col>
                            </Row>
                          </div>
                        </Form>
                        <Button
                          className="btn btn-success float-end"
                          onClick={HandlerUpload}
                        >
                          Upload Images
                        </Button>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col
                        md={{
                          offset: 3,
                          size: 6,
                        }}
                        sm="12"
                      >
                        <Button
                          type="submit"
                          onClick={handleUpload}
                          style={{ marginBottom: 10 }}
                        >
                          Image Upload
                        </Button>
                        <Row>
                          <Col
                            sm="6"
                            style={{
                              border: 1,
                              borderStyle: "dotted",
                              borderColor: "#d5d5d5",
                              paddingTop: 10,
                              paddingBottom: 10,
                            }}
                          >
                             
                            <input
                              accept="image/*"
                              id="icon-image-1-file"
                              type="file"
                              name="image-1"
                              style={{ display: "none" }}
                              onChange={handleImageChange1}
                            />
                            <label
                              htmlFor="icon-image-1-file"
                              style={{ height: "100%" }}
                            >
                              <img
                                src={
                                  isEmpty(selectedImage1)
                                    ? defaultImges
                                    : selectedImage1
                                }
                                alt=""
                                width="100%"
                                height="100%"
                              />
                            </label>
                          </Col>
                          <Col sm="6">
                            <Row>
                              <Col sm="12">
                                <Row>
                                  <Col
                                    sm="6"
                                    style={{
                                      border: 1,
                                      borderStyle: "dotted",
                                      borderColor: "#d5d5d5",
                                      paddingTop: 10,
                                      paddingBottom: 10,
                                    }}
                                  >
                                    <input
                                      accept="image/*"
                                      id="icon-image-2-file"
                                      type="file"
                                      name="image-2"
                                      style={{ display: "none" }}
                                      onChange={handleImageChange2}
                                    />
                                    <label
                                      htmlFor="icon-image-2-file"
                                      style={{ height: "100%" }}
                                    >
                                      <img
                                        src={
                                          isEmpty(selectedImage2)
                                            ? defaultImges
                                            : selectedImage2
                                        }
                                        alt=""
                                        width="100%"
                                        height="100%"
                                      />
                                    </label>
                                  </Col>
                                  <Col
                                    sm="6"
                                    style={{
                                      border: 1,
                                      borderStyle: "dotted",
                                      borderColor: "#d5d5d5",
                                      paddingTop: 10,
                                      paddingBottom: 10,
                                    }}
                                  >
                                    <input
                                      accept="image/*"
                                      id="icon-image-3-file"
                                      type="file"
                                      name="image-3"
                                      style={{ display: "none" }}
                                      onChange={handleImageChange3}
                                    />
                                    <label
                                      htmlFor="icon-image-3-file"
                                      style={{ height: "100%" }}
                                    >
                                      <img
                                        src={
                                          isEmpty(selectedImage3)
                                            ? defaultImges
                                            : selectedImage3
                                        }
                                        alt=""
                                        width="100%"
                                        height="100%"
                                      />
                                    </label>
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                sm="12"
                                style={{
                                  border: 1,
                                  borderStyle: "dotted",
                                  borderColor: "#d5d5d5",
                                  paddingTop: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                <input
                                  accept="image/*"
                                  id="icon-image-4-file"
                                  type="file"
                                  name="image-4"
                                  style={{ display: "none" }}
                                  onChange={handleImageChange4}
                                />
                                <label
                                  htmlFor="icon-image-4-file"
                                  style={{ height: "100%" }}
                                >
                                  <img
                                    src={
                                      isEmpty(selectedImage4)
                                        ? defaultImges
                                        : selectedImage4
                                    }
                                    alt=""
                                    width="100%"
                                    height="100%"
                                  />
                                </label>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardView>
            </Col>
            <Col md={12}>
              <CardView title="Gallary Images">
                <TabContent activeTab={activeTab} className="p-3 text-muted">
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <div className="popup-gallery flex-wrap">
                          <div className="img-fluid float-left ">
                            <div>
                              <div className="row">
                                {images &&
                                  Array.isArray(images) &&
                                  images.map(list => (
                                    <div className="col-md-2" key={list.id}>
                                      <div>
                                        <img
                                          src={list.src}
                                          onClick={() => {
                                            setisGallery(true)
                                            setphotoIndex(0)
                                          }}
                                          alt=""
                                          style={{
                                            margin: 1,
                                            height: 250,
                                            width: "100%",
                                          }}
                                        />
                                      </div>
                                      <div className="justify-content-center">
                                        <Button
                                          className="btn btn-danger w-100 "
                                          type="submit"
                                          onClick={() =>
                                            deleteProfileImages(list.id)
                                          }
                                        >
                                          Delete Image
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardView>
            </Col>
          </Row>
        </Container>
      </div>
      {isGallery ? (
        <Lightbox
          mainSrc={images[photoIndex].src}
          nextSrc={images[(photoIndex + 1) % images.length].src}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
          enableZoom={true}
          onCloseRequest={() => {
            setisGallery(false)
          }}
          onMovePrevRequest={() => {
            setphotoIndex((photoIndex + images.length - 1) % images.length)
          }}
          onMoveNextRequest={() => {
            setphotoIndex((photoIndex + 1) % images.length)
          }}
          imageCaption={"Project " + parseFloat(photoIndex + 1)}
        />
      ) : null}
    </React.Fragment>
  )
}
