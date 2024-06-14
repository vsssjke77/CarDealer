import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CarItem from "./CarItem";
import {Row} from "react-bootstrap";

import {fetchCars} from "../http/carAPI";

const CarList = observer(() => {
    const {car} = useContext(Context);

    useEffect(() => {
        fetchCars().then(data => car.setCars(data.rows))
    }, [car]);

    const filteredCars = car.cars.filter(c => {
        const { brand, model, yearFrom, yearTo, mileageFrom, mileageTo, priceFrom, priceTo, horsesFrom, horsesTo } = car.filters;

        return c.status === "available" &&
            (!brand || c.brand_id === parseInt(brand)) &&
            (!model || c.model.toLowerCase().includes(model.toLowerCase())) &&
            (!yearFrom || c.year >= parseInt(yearFrom)) &&
            (!yearTo || c.year <= parseInt(yearTo)) &&
            (!mileageFrom || c.mileage >= parseInt(mileageFrom)) &&
            (!mileageTo || c.mileage <= parseInt(mileageTo)) &&
            (!priceFrom || c.price >= parseInt(priceFrom)) &&
            (!priceTo || c.price <= parseInt(priceTo)) &&
            (!horsesFrom || c.horses >= parseInt(horsesFrom)) &&
            (!horsesTo || c.horses <= parseInt(horsesTo));
    });

    return (
        <Row className={"d-flex"}>
            {filteredCars.map(car =>
                <CarItem key={car.id} car={car} />
            )}
        </Row>
    );
});

export default CarList;