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
    getPlan,
    updatePlan,

    getCourse,
    getCourseVideos,
    updateCourseVideos,
    deleteUser,
    UpdateUser,
    getAllUser,
} from "services/api/api-service"
import { isEmpty, result } from "lodash"
import Swal from "sweetalert2"
import { Link, useParams } from "react-router-dom"

export default function ViewCourse() {
    document.title = "ViewCourse | Trend Sarthi"
    const [data, setData] = useState({})
    const [modelValue, modelSetValue] = useState(false)
    const [viewdata, setviewdata] = useState({})
    const { courseID } = useParams();
    const updatesHandler = data => {
        console.log(data)
        updateCourseVideos(data).then(result => {
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
    const viewHandler = data => {
        console.log(data)
        if (!isEmpty(data)) {
            modelSetValue(true)
            setviewdata(data)
        }
    }

    const handleUpdate = data => {
        console.log(data)
        updateCourseVideos(data).then(result => {
            if (!isEmpty(result)) {
                Swal.fire(
                    "Status Update",
                    "User Plan Status Update successfuly",
                    "success"
                )
                getdata()
            }
        })
    };
    const handleDelete = () => {
        deleteUser(viewData.id).then(() => {
            Swal.fire("Delete successfully", "Course Video Delete Successfully", "success");
            getModelData();
            setModelValue(false);
        });
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

    function getdata(courseID) {

        getCourseVideos().then(result => {
            if (!isEmpty(result)) {
                console.log("Courses Chapters", result);
                console.log("Courses ID", courseID);

                const filteredResult = result.filter(course => course.courseId === courseID);
                const dataList = []
                console.log("Courses Chapters filter", filteredResult);

                filteredResult.map(course =>
                    dataList.push({
                        coverImage: (
                            <div className="">
                                <img src={course.coverImage} className="img-thumbnail " style={{
                                    width: "250px",
                                }} />
                            </div>
                        ),
                        Chapter: (
                            <div className="fw-bold text-capitalize">{course.title}</div>
                        ),
                        shortDetail: course.shortDetail,
                        videoID: course.id,
                        courseID: course.courseId,
                        updateAt: course.updateAt ? formatDate(course.updateAt) : '',
                        chapterStatus: (
                            <div className={course.chapterStatus === "A" ? "text-success fw-bold" : "text-danger fw-bold"}>
                                {course.status === "A" ? "ACTIVE" : "INACTIVE"}
                            </div>
                        ),
                        toggleStatus: (
                            <FormGroup switch>
                                <Input
                                    type="switch"
                                    checked={course.chapterStatus === "A" ? true : false}
                                    onChange={() =>
                                        updatesHandler({
                                            ...course,
                                            ...{ chapterStatus: course.chapterStatus === "A" ? "I" : "A" },
                                        })
                                    }
                                />
                            </FormGroup>
                        ),
                        action: (
                            <Button
                                className="btn btn-info"
                                onClick={() => viewHandler(course)}
                            >
                                Edit
                            </Button>
                        ),
                    })
                )
                setData({
                    columns: [
                        {
                            label: "Cover Image",
                            field: "coverImage",
                            width: 50,
                        },
                        {
                            label: "Chapter No.",
                            field: "Chapter",
                            width: 100,
                        },
                        {
                            label: "Description",
                            field: "shortDetail",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Last Updated",
                            field: "updateAt",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "video ID",
                            field: "videoID",
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
                            label: "Chapter Status",
                            field: "chapterStatus",
                            sort: "asc",
                            width: 100,
                        },

                        {
                            label: "Status",
                            field: "toggleStatus",
                            width: 100,
                        },
                        // {
                        //     label: "Fetured",
                        //     field: "fetured",
                        //     width: 100,
                        // },
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
        getdata(courseID)
    }, [courseID])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="LMS" breadcrumbItem="View Course" />
                    <Row>
                        <Col md={12}>
                            <CardView title={data.title}>
                                <TableData tabledata={data} />
                            </CardView>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* modal view box */}
            <ModelBox
                modelValue={modelValue}
                sizeValue={"lg"}
                modelSetValue={modelSetValue}
                titleLabel="Edit Course Video"
            >
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <tbody>
                            <tr>
                                <th>Video ID</th>
                                <td>
                                    {viewdata.id}
                                </td>
                            </tr>
                            <tr>
                                <th>Cover Image</th>
                                <td >
                                    <div className="d-grid">
                                        <img src={viewdata.coverImage} className="img-thumbnail" style={{ width: "250px" }} />
                                        <input type="file" className="" id="" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Chapter No.</th>
                                <td className="fw-bold text-capitalize">
                                    <input type="input" className="" id=""
                                        value={viewdata.title}>
                                    </input>
                                </td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>
                                    <input type="input" className="" id=""
                                        value={viewdata.shortDetail}>
                                    </input>
                                </td>
                            </tr>
                            <tr>
                                <th>URL:</th>
                                <td>
                                    <input type="url" className="" id=""
                                        value={viewdata.vediourl}>
                                    </input>
                                </td>
                            </tr>

                            <tr>
                                <th>PLan Status</th>
                                <td className={viewdata.chapterStatus === "A" ? "text-success fw-bold" : "text-danger fw-bold"}>
                                    {viewdata.chapterStatus === "A" ? "ACTIVE" : "INACTIVE"}
                                </td>
                            </tr>
                            <tr>
                                <th>User Expiry</th>
                                <td>{viewdata.updateAt ? formatDate(viewdata.updateAt) : ''}</td>
                            </tr>
                        </tbody>

                    </table>

                    <Button className="btn btn-success mt-3" onClick={handleUpdate}>
                        Update
                    </Button>
                    <Button
                        onClick={() => deleteUser(viewdata.id)}
                        className="btn btn-danger mt-3 ms-3"
                    >
                        Delete
                    </Button>
                </div>
            </ModelBox>
        </React.Fragment>
    )
}
