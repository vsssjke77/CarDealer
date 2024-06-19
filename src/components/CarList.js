import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CarItem from "./CarItem";
import {Row, Spinner} from "react-bootstrap";

import {fetchCars} from "../http/carAPI";
import {fetchModels} from "../http/modelAPI";

const CarList = observer(() => {
    const {car,model} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCars().then(data => car.setCars(data.rows))
        fetchModels().then(data => model.setModels(data))
        setIsLoading(false);
    }
    , [car,model]);

    if (isLoading){
        return (
            <div style={{display: 'flex', color:"white", justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Spinner style={{width: 100, height: 100}} animation={"border"}/>
            </div>
        );
    }

    const filteredCars = car.cars.filter(c => {
        const {
            brand,
            model,
            yearFrom,
            yearTo,
            mileageFrom,
            mileageTo,
            priceFrom,
            priceTo,
            horsesFrom,
            horsesTo
        } = car.filters;

        const parseRange = (from, to) => {
            const fromValue = parseInt(from) || 0;
            const toValue = parseInt(to) || Infinity;
            return fromValue <= toValue ? { from: fromValue, to: toValue } : { from: toValue, to: fromValue };
        };

        const yearRange = parseRange(yearFrom, yearTo);
        const mileageRange = parseRange(mileageFrom, mileageTo);
        const priceRange = parseRange(priceFrom, priceTo);
        const horsesRange = parseRange(horsesFrom, horsesTo);

        return c.status === "available" &&
            (!brand || c.brand_id === parseInt(brand)) &&
            (!model || c.model_id === parseInt(model)) &&
            c.year >= yearRange.from && c.year <= yearRange.to &&
            c.mileage >= mileageRange.from && c.mileage <= mileageRange.to &&
            c.price >= priceRange.from && c.price <= priceRange.to &&
            c.horses >= horsesRange.from && c.horses <= horsesRange.to;
    });

    return (
        <Row className={"d-flex"}>
            {filteredCars.map(car =>
                <CarItem key={car.id} car={car}/>
            )}
            {filteredCars.length === 0 && <h1 style={{color: "white"} }>Нет автомобиля соответствующего фильтру</h1>}
        </Row>
    );
});

export default CarList;