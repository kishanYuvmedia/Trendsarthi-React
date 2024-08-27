import React, { useEffect, useState } from "react"
import {
    Col,
    Row,
    Container,
    Badge,
    Input,
    FormGroup,
    Button,
    Dropdown,
} from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CardView, ModelBox } from "../ui-components"
import TableData from "pages/ui-components/table-data"
import {
    getCourse,
    updateTdCourses,
    addTdCourse,
    deleteStudyList,
    addStudyList
} from "services/api/api-service"
import { isEmpty, result } from "lodash"
import Swal from "sweetalert2"
import { Link} from "react-router-dom"
export default function Courses() {
    document.title = "All Courses | Trend Sarthi"
    const options=['Course','Live Streem'];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [onSelect,setonSelect]=useState({});
    const [data, setData] = useState({})
    const [modelValue, modelSetValue] = useState(false)
    const [viewdata, setviewdata] = useState({})
    const [modelNewAdd, setModelNewAdd] = useState(false)
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [Pricing, setPricing] = useState('');
    const [Url, setUrl] = useState('');
    const [type,settype]=useState('');
    const [coverImage, setSelectedFile] = useState(null);
    const [coverImageView, setSelectedView] = useState(null);
    const [message, setErrorMessage] = useState("");
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ]
            if (allowedTypes.includes(file.type)) {
                setSelectedFile(file)
                // Create a FileReader to read the selected file
                const reader = new FileReader()
                reader.onload = e => {
                    setSelectedView(e.target.result) // Set the imagePreview state with the data URL
                }
                reader.readAsDataURL(file)
            } else {
                setSelectedFile(null)
                setErrorMessage("Please select a valid image file (jpg, jpeg, or png).")
                setSelectedView(null) // Clear the image preview
            }
        }
    };
    const updatesHandler = data => {
        console.log(data)
        updateTdCourses(data).then(result => {
            if (!isEmpty(result)) {
                Swal.fire(
                    "Status Update",
                    "User Plan Status Update successfuly",
                    "success"
                )
                getdata()
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const coverImagePath = await handleUpload(coverImage);
        if (!isEmpty(coverImagePath)) {
            const formData = {
                title: title,
                shortDetail: subtitle,
                type: onSelect,
                pricing:Pricing,
                coverImage: coverImagePath.imageUrl,
                url: Url
            };
            console.log("Study Material Form Data:", formData);
            addTdCourse(formData).then(result => {
                console.log(result);
                if (!isEmpty(result)) {
                    alert("Data Upload successfully");
                    setModelNewAdd(false);
                }
            }).catch(error => {
                console.error("Error adding study material:", error);
            });
        } else {
            console.error("cover image upload failed.");
        }
    };
    const handleUpload = async (file) => {
        if (!file) {
            return null; 
        }
        const formDataImage = new FormData();
        formDataImage.append("image", file, "tradsarthi.jpg");
        try {
            const response = await fetch("https://api.trendsarthi.com/upload-image.php", {
                method: "POST",
                body: formDataImage,
            });
            const data = await response.json();
            if (data && data.success) {
                Swal.fire("Your cover page updated successfully", "success");
                console.log(data);
                return data;
            } else {
                Swal.fire("Data not uploaded. Please try again", "success");
                console.log(data);
                return null;
            }
        } catch (error) {
            // Handle any errors
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong. Please retry uploading image",
            });
            return null;
        }
    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = getMonthName(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }
    function getMonthName(monthNumber) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return months[monthNumber - 1];
    }

    function getdata() {
        getCourse().then(result => {
            if (!isEmpty(result)) {
                console.log("Courses", result);

                const dataList = []

                result.map(course =>
                    dataList.push({
                        coverImage: (
                            <div className="">
                                <img src={course.coverImage} className=" img-thumbnail" style={{
                                    width: "250px",
                                }}
                                />
                            </div>
                        ),
                        courseTitle: (
                            <div className="fw-bold text-capitalize">{course.title}</div>
                        ),
                        shortDetail: course.shortDetail,
                        courseID: course.id,
                        CoursePricing: (
                            <div className="text-success fw-bold">₹&#160;
                                {course.pricing}
                            </div>
                        ),

                        courseStatus: (
                            <div className={course.courseStatus === "A" ? "text-success fw-bold" : "text-danger fw-bold"}>
                                {course.courseStatus === "A" ? "ACTIVE" : "INACTIVE"}
                            </div>
                        ),
                        toggleStatus: (
                            <FormGroup switch>
                                <Input
                                    type="switch"
                                    checked={course.courseStatus === "A" ? true : false}
                                    onChange={() =>
                                        updatesHandler({
                                            ...course,
                                            ...{ courseStatus: course.courseStatus === "A" ? "I" : "A" },
                                        })
                                    }
                                />
                            </FormGroup>
                        ),
                        action: (
                            <div className="d-flex">
                                <Link
                                    to={`/LMS/courses/viewCourse/${course.id}`}
                                    className="btn btn-success mt-3"
                                >
                                    View
                                </Link>
                            </div>
                        ),
                    })
                )
                setData({
                    columns: [
                        {
                            label: "Course Thumbnail",
                            field: "coverImage",
                            width: 100,
                        },
                        {
                            label: "Course title",
                            field: "courseTitle",
                            width: 100,
                        },
                        {
                            label: "Description",
                            field: "shortDetail",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Pricing",
                            field: "CoursePricing",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Course ID",
                            field: "courseID",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Course Status",
                            field: "courseStatus",
                            sort: "asc",
                            width: 100,
                        },

                        {
                            label: "Status",
                            field: "toggleStatus",
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
    const deleteUser = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(result => {
            if (result.isConfirmed) {
                deleteUser(id).then(result => {
                    Swal.fire(
                        "Delete successfully",
                        "Influencer Profile Delete successfuly",
                        "success"
                    );
                    getdata();
                });
            }
        });
    };
    useEffect(() => {
        getdata()
    }, [])
    const handleSelect = (option) => {
        setSelectedOption(option);
        setonSelect(option);
      };
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="LMS" breadcrumbItem="Courses" />
                    <Row>
                        <Col md={12}><Button className="btn btn-info float-end mb-2" onClick={() => setModelNewAdd(true)}>Add New Course</Button></Col>
                        <Col md={12}>
                            <CardView title="LMS Courses" >
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
                titleLabel="View User Details"
            >
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <tbody>
                            <tr>
                                <th>User Type</th>
                                <td >{viewdata.userType}</td>
                            </tr>
                            <tr>
                                <th>Account Created</th>
                                <td >{viewdata.codeCreatedAt}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td className="fw-bold text-capitalize">{viewdata.contactName}</td>
                            </tr>
                            <tr>
                                <th>Contact Number</th>
                                <td>{viewdata.contactNumber}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{viewdata.email}</td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td>{viewdata.city}</td>
                            </tr>
                            <tr>
                                <th>State</th>
                                <td>{viewdata.state}</td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td>{viewdata.country}</td>
                            </tr>
                            <tr>
                                <th>Current Plan</th>
                                <td>{viewdata.planId}</td>
                            </tr>
                            <tr>
                                <th>PLan Status</th>
                                <td className={viewdata.status === "A" ? "text-success fw-bold" : "text-danger fw-bold"}>
                                    {viewdata.status === "A" ? "ACTIVE" : "INACTIVE"}
                                </td>
                            </tr>
                            <tr>
                                <th>User Expiry</th>
                                <td>{viewdata.expairyDate ? formatDate(viewdata.expairyDate) : ''}</td>
                            </tr>
                        </tbody>

                    </table>
                    <Button
                        onClick={() => deleteUser(viewdata.id)}
                        className="btn btn-danger mt-3"
                    >
                        Delete
                    </Button>
                </div>
            </ModelBox>
            <ModelBox
                modelValue={modelNewAdd}
                sizeValue={"lg"}
                modelSetValue={setModelNewAdd}
                titleLabel="Add Study Material"
            >
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <label>Type:</label>
                        <select value={selectedOption} className="form-control" onChange={(e) => handleSelect(e.target.value)}>
                            {options.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label>Course title</label>
                        <input type="text" value={title} className="form-control" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label>Description</label>
                        <input type="text" value={subtitle} className="form-control" onChange={(e) => setSubtitle(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label>Pricing</label>
                        <input type="text" value={Pricing} className="form-control" onChange={(e) => setPricing(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label>Cover Image</label>
                        <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
                    </div>
                    <div className="col-md-6">
                        <label>Url</label>
                        <input type="text" value={Url} className="form-control" onChange={(e) => setUrl(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        {coverImageView && (
                            <img
                                src={coverImageView}
                                alt="Img Preview"
                                name="coverImage"
                                className="img-fluid mt-4"
                            />
                        )}
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-success float-end mb-2 mt-4">Upload</button>
                    </div>
                </form>
                {message &&
                    <strong style={{ textAlign: 'start', color: 'red' }}>{message}</strong>
                }
            </ModelBox>
        </React.Fragment>
    )
}
