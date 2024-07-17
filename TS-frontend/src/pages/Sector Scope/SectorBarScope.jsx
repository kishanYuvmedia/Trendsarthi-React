import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardBody } from "reactstrap"


export default function SectorBarScope({ header, status, tableId }) {

    useEffect(() => {
        // Initialize DataTable when the component mounts
        const tableElement = document.querySelector(`#${tableId}`);
        if ($.fn.DataTable.isDataTable(tableElement)) {
            // Destroy the existing DataTable before reinitializing
            $(tableElement).DataTable().destroy();
        }

        // Initialize DataTable with options to disable search and pagination
        $(tableElement).DataTable({
            searching: false,   // Disable search
            paging: false,      // Disable pagination
        });
    }, [tableId]);

    return (
        <div>
            <Card
                className="my-2 Drag"
                style={{
                    border: '1px solid transparent',
                    borderRadius: '14px',
                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                    padding: '10px',
                    backgroundColor: "#181a33"
                }}
            >
                <CardHeader className=' rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                    <div className="d-flex align-items-center  ">
                        <div className="text-white  fs-5">
                            {header}
                        </div>
                        <span className="badge fs-6 ms-2 text-info">
                            <i className='bx bxs-circle'></i>
                            ACTIVE
                        </span>
                    </div>
                    <div className="text-white">
                        How to use
                    </div>
                </CardHeader>
                <CardBody className="p-3 pt-0">
                    <div className="border p-3 rounded-4 bg-black">
                        candle stick chart will come here
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
