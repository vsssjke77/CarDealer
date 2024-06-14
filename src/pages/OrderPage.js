import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Spinner, Table} from "react-bootstrap";
import {CAR_ROUTE} from "../utils/consts";
import edit_icon from "../assets/edit_icon.png";
import del_icon from "../assets/del_icon.png";
import {fetchBrands} from "../http/brandAPI";
import {fetchCarsForUser} from "../http/carAPI";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import CancelReserve from "../components/modals/CancelReserve";

const OrderPage = observer(() => {

    const {user,brand,car} = useContext(Context)

    const navigate = useNavigate()
    const [dataChanged, setDataChanged] = useState(false); // Состояние для отслеживания изменений в данных
    const [loading, setLoading] = useState(true);
    const [reserveVisible, setReserveVisible] = useState(false);
    const [selectedCar, setSelectedCar] = useState({}); // Добавляем состояние для хранения выбранной машины


    useEffect(() => {
        fetchBrands().then(data => brand.setBrands(data))
        fetchCarsForUser(user.id).then(data => car.setCars(data.rows) )
        setDataChanged(false);
        setLoading(false);
    }, [brand, car, dataChanged,user]);



    const handleDataChanged = () => {
        setDataChanged(!dataChanged); // Обновляем состояние для вызова useEffect
    };

    const handleDeleteClick = (car) => {
        setReserveVisible(true); // Показать модальное окно изменения информации о машине
        setSelectedCar(car); // Сохранить выбранную машину в состоянии
    };

    if (loading){
        return (
            <div style={{display: 'flex', color:"white", justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Spinner style={{width: 100, height: 100}} animation={"border"}/>
            </div>
        );
    }

    return (
        <Container>
            <h1 className={"d-flex justify-content-center mt-3"} style={{color: "white"}} >Ваши записи на тест-драйв</h1>
            <CancelReserve show={reserveVisible} onHide={() => {
                        setReserveVisible(false)
                    }} car_item={selectedCar} onSubmit={handleDataChanged}/>
            <Table className={"mt-4"} responsive="sm">
                <thead>
                <tr>
                    <th className={"asd"}>id</th>
                    <th>Марка</th>
                    <th>Модель</th>
                    <th>Цена</th>
                    <th>Год</th>
                    <th>Мощность</th>
                    <th>Vin номер</th>
                    <th>Пробег</th>
                    <th>Статус</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                {car.cars.map((car) => (
                    <tr key={car.id}>
                        <td>{car.id}</td>
                        <td>{brand.getBrandTitleById(car.brand_id)}</td>
                        <td>{car.model}</td>
                        <td>{car.price.toLocaleString('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                            maximumFractionDigits: 0
                        })}</td>
                        <td>{car.year}</td>
                        <td>{car.horses} л.с</td>
                        <td>
                            <p style={{cursor: "pointer"}}
                               onClick={() => navigate(CAR_ROUTE + '/' + car.id)}>{car.vin}</p>
                        </td>
                        <td>{car.mileage}</td>
                        <td>{car.status}</td>
                        <td>
                            <Button style={{display: "flex"}} variant={"outline-dark"} onClick={() => handleDeleteClick(car)}>Отменить бронь</Button>
                        </td>

                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
});

export default OrderPage;