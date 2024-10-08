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
    getStudyList,
    deleteStudyList,
    addStudyList
} from "services/api/api-service"
import { isEmpty, result } from "lodash"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"

export default function StudyMaterial() {
    document.title = "Study Material | Trend Sarthi"
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [coverImage, setSelectedFile] = useState(null);
    const [coverImageView, setSelectedView] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
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

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf"]; // Only allow PDF files
            if (allowedTypes.includes(file.type)) {
                setPdfFile(file);
                // Create a FileReader to read the selected file
                const reader = new FileReader();
                reader.readAsDataURL(file);
            } else {
                setPdfFile(null);
                setErrorMessage("Please select a valid PDF file.");
                setSelectedView(null); // Clear the preview
            }
        }
    };
    const [data, setData] = useState({})
    const [modelValue, modelSetValue] = useState(false)
    const [modelNewAdd, setModelNewAdd] = useState(false)
    const [viewdata, setviewdata] = useState({})
    const viewHandler = data => {
        console.log(data)
        if (!isEmpty(data)) {
            modelSetValue(true)
            setviewdata(data)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const coverImagePath = await handleUpload(coverImage);
        const pdfPath = await handleUploadpdf(pdfFile);
        console.log("PDF Path:", pdfPath);
        console.log("Cover Image Path:", coverImagePath);
        // Check if both cover image and PDF file are uploaded successfully
        if (!isEmpty(pdfPath) && !isEmpty(coverImagePath)) {
            // Construct form data
          
            const formData = {
                title: title,
                shortline: subtitle,
                type: 'PDF',
                file: pdfPath.pdfUrl,
                coverImage: coverImagePath.imageUrl,
            };
    
            console.log("Study Material Form Data:", formData);
            // Call function to add study material using the form data
            // Uncomment the below lines once you have defined the 'addStudyList' function
            addStudyList(formData).then(result => {
                console.log(result);
                if(!isEmpty(result))
                {
                    alert("Data Upload successfully");
                    setModelNewAdd(false);
                }
            }).catch(error => {
                console.error("Error adding study material:", error);
            });
        } else {
            console.error("PDF or cover image upload failed.");
        }
    };
    
    const handleUpload = async (file) => {
        if (!file) {
            return null; // Return early if no file is provided
        }
    
        const formDataImage = new FormData();
        formDataImage.append("image", file, "tradsarthi.jpg"); // You can set the filename here
    
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
    
    const handleUploadpdf = async (file) => {
        if (!file) {
            return null; // Return early if no file is provided
        }
    
        const formDataPdf = new FormData();
        formDataPdf.append("file", file, "tradsarthi-study.pdf"); // You can set the filename here
    
        try {
            const response = await fetch("https://api.trendsarthi.com/upload-pdf.php", {
                method: "POST",
                body: formDataPdf,
            });
    
            const data = await response.json();
    
            if (data && data.success) {
                Swal.fire("Your study material uploaded successfully", "success");
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
                text: "Something went wrong. Please retry uploading PDF file",
            });
            return null;
        }
    };
    
    function getdata() {
        getStudyList().then(result => {
            if (!isEmpty(result)) {
                console.log("Plans", result);
                const dataList = []
                result.map(plan =>
                    dataList.push({
                        title: (
                            <div className="fw-bold text-capitalize">{plan.title}</div>
                        ),
                        coverImage: (
                            <div className="">
                                <img src={plan.coverImage} className=" img-thumbnail" style={{
                                    width: "50px",
                                }}
                                />
                            </div>
                        ),
                        shortline: plan.shortline,
                        type: plan.type,
                        action: (
                           <>
                            <Button
                                className="btn btn-success"
                                onClick={() => viewHandler(plan)}
                            >
                                View
                            </Button>
                            <Button
                            className="btn btn-danger"
                            onClick={() => deleteUser(plan.id)}
                        >
                            Delete
                        </Button>
                           </>
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
                            label: "Type",
                            field: "type",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Title",
                            field: "title",
                            width: 100,
                        },
                        {
                            label: "Short line",
                            field: "shortline",
                            width: 150,
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
                deleteStudyList(id).then(result => {
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
                    <Breadcrumbs title="Study Material" breadcrumbItem="All Study Material" />

                    <Row>
                        <Col md={12}><Button className="btn btn-info float-end mb-2" onClick={() => setModelNewAdd(true)}>Add New</Button></Col>
                        <Col md={12}>
                            <CardView title="Study Material">
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
                titleLabel="View Details"
            >
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <td >{viewdata.title}</td>
                            </tr>
                            <tr>
                                <th>Short line</th>
                                <td >{viewdata.shortline}</td>
                            </tr>
                            <tr>
                                <th>type</th>
                                <td className="fw-bold text-capitalize">{viewdata.type}</td>
                            </tr>
                            <tr>
                                <th>File</th>
                                <td><a href={`${viewdata.file}`} download className="btn btn-info" target="_blank" rel="noreferrer">Download</a></td>
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
                        <label>Title:</label>
                        <input type="text" value={title} className="form-control" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label>Subtitle:</label>
                        <input type="text" value={subtitle} className="form-control" onChange={(e) => setSubtitle(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label>Cover Image:</label>
                        <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
                    </div>
                    <div className="col-md-6">
                        <label>PDF File:</label>
                        <input type="file" accept=".pdf" className="form-control" onChange={handlePdfChange} />
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
