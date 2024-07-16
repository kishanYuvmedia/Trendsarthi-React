import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardBody } from "reactstrap"

let candles = './candle-sticks.png';

export default function NiftyChart({ header, cssStyle, tableId }) {

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
                className="my-2 Drag m-3"
                style={{
                    border: '1px solid transparent',
                    borderRadius: '14px',
                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                    padding: '10px',
                }}
            >
                <CardHeader className='d-flex justify-content-between rounded-4 bg-black '>
                    <div>
                        <div className="text-white fs-3 fw-bold">{header} <span className="text-white fs-6 fw-normal">
                            How to use
                        </span></div>

                    </div>


                    <div className="dropdown">
                        <button className="btn btn-black border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Chart Type
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>


                </CardHeader>
                <CardBody className="p-3 pt-0">
                    <div className="border p-3 rounded-4 " >
                       candle stick char will come here
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
