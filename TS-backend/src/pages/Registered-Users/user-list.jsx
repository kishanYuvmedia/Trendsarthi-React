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
    
    deleteUser,
    UpdateUser,
    getAllUser,
} from "services/api/api-service"
import { isEmpty, result } from "lodash"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"

export default function UserList() {
    document.title = "All Users | Trend Sarthi"
    const [data, setData] = useState({})
    const [modelValue, modelSetValue] = useState(false)
    const [viewdata, setviewdata] = useState({})

    const updatesHandler = data => {
        console.log(data)
        UpdateUser(data).then(result => {
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
        getAllUser().then(result => {
            if (!isEmpty(result)) {
                console.log("first", result)
                let dataList = []
                let filteredData = result.filter(user => user.userType === 'user');

                dataList = filteredData.map(user => ({
                    userName: (
                        <div className="fw-bold text-capitalize">{user.contactName}</div>
                    ),
                    userContact: user.contactNumber,
                    userEmail: user.email,
                    // userCity: user.city,
                    // userState: user.state,
                    userPlan: user.planId,
                    expairyDate: user.expairyDate ? formatDate(user.expairyDate) : '',
                    userStatus: (
                        <div className={user.status === "A" ? "text-success fw-bold" : "text-danger fw-bold"}>
                            {user.status === "A" ? "ACTIVE" : "INACTIVE"}
                        </div>
                    ),
                    toggleStatus: (
                        <FormGroup switch>
                            <Input
                                type="switch"
                                checked={user.status === "A" ? true : false}
                                onChange={() =>
                                    updatesHandler({
                                        ...user,
                                        ...{ status: user.status === "A" ? "I" : "A" },
                                    })
                                }
                            />
                        </FormGroup>
                    ),
                    action: (
                        <Button
                            className="btn btn-success"
                            onClick={() => viewHandler(user)}
                        >
                            View
                        </Button>
                    ),
                }));

                setData({
                    columns: [
                        {
                            label: "User",
                            field: "userName",
                            width: 100,
                        },
                        {
                            label: "Contact No.",
                            field: "userContact",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Email",
                            field: "userEmail",
                            sort: "asc",
                            width: 100,
                        },
                        // {
                        //     label: "City",
                        //     field: "userCity",
                        //     sort: "asc",
                        //     width: 100,
                        // },
                        // {
                        //     label: "State",
                        //     field: "userState",
                        //     sort: "asc",
                        //     width: 100,
                        // },
                        {
                            label: "Plan",
                            field: "userPlan",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Expairy Date",
                            field: "expairyDate",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Plan Status",
                            field: "userStatus",
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
        getdata()
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="users" breadcrumbItem="All Users" />
                    <Row>
                        <Col md={12}>
                            <CardView title="All Users">
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

                    {/* <Link
                        to={`/influencer/add-Images-Vedio/${viewdata.id}`}
                        className="btn btn-info mt-3"
                    >
                        Add Images and video
                    </Link> */}
                    <Button
                        onClick={() => deleteUser(viewdata.id)}
                        className="btn btn-danger mt-3"
                    >
                        Delete
                    </Button>
                </div>
            </ModelBox>
        </React.Fragment>
    )
}
