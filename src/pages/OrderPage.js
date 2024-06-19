import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Spinner, Table} from "react-bootstrap";
import {CAR_ROUTE} from "../utils/consts";
import {fetchBrands} from "../http/brandAPI";
import {fetchCarsForUser, fetchOneCar} from "../http/carAPI";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import CancelReserve from "../components/modals/CancelReserve";
import {fetchModels} from "../http/modelAPI";
import {fetchReservesForUser} from "../http/reserveAPI";
import {format} from 'date-fns'; // Импорт функции format

const OrderPage = observer(() => {
    const {user, brand, car, reserve, model} = useContext(Context);
    const navigate = useNavigate();
    const [dataChanged, setDataChanged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reserveVisible, setReserveVisible] = useState(false);
    const [selectedCar, setSelectedCar] = useState({});
    const [selectedReserve, setSelectedReserve] = useState(null);
    const [carsForReserves, setCarsForReserves] = useState([]); // Состояние для хранения информации о машинах


    useEffect(() => {
        // Фетчим данные о брендах и моделях
        fetchBrands().then(data => brand.setBrands(data));
        fetchModels().then(data => model.setModels(data));

        // Фетчим данные о резервах пользователя
        fetchReservesForUser(user.id).then(data => {
            reserve.setReservesForUser(data);

            // Создаем массив промисов для фетча данных о машинах для каждого резерва
            const promises = data.map(reserve => fetchOneCar(reserve.car_id));
            Promise.all(promises).then(cars => {
                setCarsForReserves(cars); // Сохраняем данные о машинах в состоянии
                setLoading(false); // Устанавливаем загрузку в false после загрузки всех данных
            }).catch(error => {
                console.error("Ошибка при загрузке данных о машинах:", error);
                setLoading(false); // В случае ошибки также завершаем загрузку
            });
        });

        setDataChanged(false);
    }, [brand, car, dataChanged, reserve, user, model]);

    const handleDataChanged = () => {
        setDataChanged(!dataChanged);
    };

    const handleDeleteClick = (car, reserve) => {
        setReserveVisible(true);
        setSelectedReserve(reserve);
        setSelectedCar(car);
    };

    const formatVin = (vin) => {
        if (vin.length <= 6) {
            return vin;
        }
        const firstPart = vin.substring(0, 3);
        const lastPart = vin.substring(vin.length - 3);
        const stars = '*'.repeat(vin.length - 6);
        return `${firstPart}${stars}${lastPart}`;
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                color: "white",
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Spinner style={{width: 100, height: 100}} animation={"border"}/>
            </div>
        );
    }

    return (
        <Container>
            <h1 className={"d-flex justify-content-center mt-3"} style={{color: "white"}}>Ваши записи на тест-драйв</h1>
            {selectedReserve && <CancelReserve show={reserveVisible} onHide={() => setReserveVisible(false)} car_item={selectedCar}
                            onSubmit={handleDataChanged} reserve_item={selectedReserve}/>
            }
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
                    <th>Дата</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                {reserve.reservesForUser.map((reserve, index) => (
                    <tr key={reserve.id}>
                        <td>{reserve.id}</td>
                        <td>{brand.getBrandTitleById(carsForReserves[index].brand_id)}</td>
                        <td>{model.getModelTitleById(carsForReserves[index].model_id)}</td>
                        <td>{carsForReserves[index].price.toLocaleString('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                            maximumFractionDigits: 0
                        })}</td>
                        <td>{carsForReserves[index].year}</td>
                        <td>{carsForReserves[index].horses} л.с</td>
                        <td>
                            <p style={{cursor: "pointer"}}
                               onClick={() => navigate(CAR_ROUTE + '/' + carsForReserves[index].id)}>{formatVin(carsForReserves[index].vin)}</p>
                        </td>
                        <td>{carsForReserves[index].mileage}</td>
                        <td>
                            <div>{'С ' + format(new Date(reserve.start_date), 'dd.MM.yyyy HH:mm')} {/* Форматирование даты */}</div>
                            <div>{'До ' + format(new Date(reserve.end_date), 'dd.MM.yyyy HH:mm')} {/* Форматирование даты */}</div>
                        </td>
                        <td>
                            <Button style={{display: "flex"}} variant={"outline-dark"}
                                    onClick={() => handleDeleteClick(carsForReserves[index], reserve)}>Отменить
                                бронь</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
});

export default OrderPage;
