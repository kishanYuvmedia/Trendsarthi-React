import React, { useEffect, useState } from 'react';
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
let candles = './images/candle-sticks.png';

const CardSlider = ({ header, list }) => {
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        setDataList(list)
        console.log("dataList", list);
    }, [])
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <div>
                    <span className='fs-6 text-white fw-bold'>{header}</span>
                    <i className='bx bxs-bulb bx-flashing text-warning fs-3 ms-2' ></i>
                    <i className='bx bx-play-circle fs-3 text-danger ms-2'></i>
                </div>
                <Link to="/marketpulsetabs" >
                    <div className='text-white'>
                        See All <i className='bx bx-chevron-right'></i>
                    </div>
                </Link>
            </div>

            <Flicking
                align="prev"
                inputType={["touch", "mouse"]}
                bound={true}
                circular={true}
                onMoveEnd={e => {
                    console.log(e);
                }}
            >
                {dataList?.slice(1, 10).map((data, index) => (
                    <div className="panel" key={index}>
                        <Card
                            className="m-2"
                            style={{
                                border: '1px solid transparent',
                                borderRadius: '14px',
                                boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                padding: '10px',
                            }}
                        >
                            <CardBody className="p-2 pt-0 position-relative">
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        {data.INSTRUMENTIDENTIFIER }
                                    </div>
                                    <div>
                                        <img src={candles} className="" alt="candles" />
                                        <i className='btn bx bxs-bookmark-plus fs-4 p-0' ></i>
                                    </div>
                                </div>
                                <div className="fw-bold text-white">
                                    {data.INSTRUMENTIDENTIFIER
                                    }
                                </div>
                                <div>
                                    T.O.
                                    <div className="text-white fw-bold fs-5">
                                        {data.VALUE}
                                    </div>
                                    <div className={data.changeColor}>
                                        <i className={data.changeIcon}></i>
                                        {data.PRICECHANGEPERCENTAGE
                                        }
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </Flicking>
        </div>
    )
}

export default CardSlider;
