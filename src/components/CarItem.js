import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from 'react-router-dom';
import {CAR_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const CarItem = observer (({car}) => {
    const navigate = useNavigate()
    const {brand,model} = useContext(Context);
    return (
        <Col md={4} className="mt-3"  >
            <Card onClick={() => navigate(CAR_ROUTE + '/' + car.id)} style={{width: 220, cursor: 'pointer', border: "lightgray", backgroundColor: "#5A5A5A"}}>
                <Image width={220} height={140} src={process.env.REACT_APP_API_URL + car.img}/>
                <div className=" md-1 d-flex justify-content-between align-items-center" >
                    <div  style={{color: "white", paddingLeft: 3}}>{brand.getBrandTitleById(car.brand_id)}</div>
                    <div style={{color: "white", paddingRight: 3}}>
                        {car.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })}
                    </div>
                </div>
                <div style={{ display: 'flex', color: "white", paddingLeft: 3, justifyContent: "space-between"}}>
                    <div>{model.getModelTitleById(car.model_id)}</div>
                    <div className={"d-flex text-nowrap"}>{car.mileage + ' км'}</div>

                    </div>
            </Card>
        </Col>
    );
});

export default CarItem;