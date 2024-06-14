import React, {useContext, useEffect, useState} from 'react';
import {Button, ButtonGroup, Container, Dropdown, Table} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateCar from "../components/modals/CreateCar";
import CreatePart from "../components/modals/CreatePart";
import ChangeInfoCar from "../components/modals/ChangeInfoCar";
import {Context} from "../index";
import CreateMaintenance from "../components/modals/CreateMaintenance";
import {observer} from "mobx-react-lite";
import {fetchCars} from "../http/carAPI";
import {fetchBrands} from "../http/brandAPI";
import edit_icon from "../assets/edit_icon.png"
import del_icon from "../assets/del_icon.png"
import DeleteCar from "../components/modals/DeleteCar";
import ChangeBrand from "../components/modals/ChangeBrand";
import DeleteBrand from "../components/modals/DeleteBrand";
import ChangePart from "../components/modals/ChangePart";
import DeletePart from "../components/modals/DeletePart";

import {CAR_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";


const Admin = observer(() => {
    const {car, brand} = useContext(Context);
    const navigate = useNavigate()

    const [brandVisible, setBrandVisible] = useState(false);
    const [brandChangeVisible, setBrandChangeVisible] = useState(false);
    const [brandDeleteVisible, setBrandDeleteVisible] = useState(false);
    const [carVisible, setCarVisible] = useState(false);
    const [partVisible, setPartVisible] = useState(false);
    const [partChangeVisible, setPartChangeVisible] = useState(false);
    const [partDeleteVisible, setPartDeleteVisible] = useState(false);
    const [changeVisible, setChangeVisible] = useState(false);
    const [maintenanceVisible, setMaintenanceVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);


    const [selectedCar, setSelectedCar] = useState(null); // Добавляем состояние для хранения выбранной машины
    const [dataChanged, setDataChanged] = useState(false); // Состояние для отслеживания изменений в данных

    useEffect(() => {
        fetchBrands().then(data => brand.setBrands(data))
        fetchCars().then(data => car.setCars(data.rows))
        setDataChanged(false);
    }, [brand, car, dataChanged]);

    const handleEditClick = (car) => {
        setChangeVisible(true); // Показать модальное окно изменения информации о машине
        setSelectedCar(car); // Сохранить выбранную машину в состоянии
    };
    const handleDeleteClick = (car) => {
        setDeleteVisible(true); // Показать модальное окно изменения информации о машине
        setSelectedCar(car); // Сохранить выбранную машину в состоянии
    };

    const handleCarChanged = () => {
        setDataChanged(!dataChanged); // Обновляем состояние для вызова useEffect
    };

    const handleBrandChanged = () => {
        setDataChanged(!dataChanged); // Обновляем состояние для вызова useEffect
    };
    const handlePartChanged = () => {
        setDataChanged(!dataChanged); // Обновляем состояние для вызова useEffect
    };


    return (
        <Container>
            <div className="text-center d-flex justify-content-around mt-3">
                <Dropdown as={ButtonGroup}>

                    <Dropdown.Toggle variant="light"
                                     id="dropdown-split-basic">{"Выберите действие с маркой"}</Dropdown.Toggle>

                    <Dropdown.Menu style={{width:'100%'}}>
                        <Dropdown.Item onClick={() => setBrandVisible(true)}>Добавить марку автомобиля</Dropdown.Item>
                        <Dropdown.Item onClick={() => setBrandChangeVisible(true)}>Изменить марку
                            автомобиля</Dropdown.Item>
                        <Dropdown.Item onClick={() => setBrandDeleteVisible(true)}>Удалить марку
                            автомобиля</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                <Button variant={"light"} onClick={() => setCarVisible(true)}>Добавить автомобиль</Button>
                <Dropdown as={ButtonGroup}>

                    <Dropdown.Toggle variant="light"
                                     id="dropdown-split-basic">{"Выберите действие с деталями"}</Dropdown.Toggle>

                    <Dropdown.Menu style={{width:'100%'}}>
                        <Dropdown.Item onClick={() => setPartVisible(true)}>Добавить деталь</Dropdown.Item>
                        <Dropdown.Item onClick={() => setPartChangeVisible(true)}>Изменить деталь
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setPartDeleteVisible(true)}>Удалить деталь
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                <Button variant={"light"} onClick={() => setMaintenanceVisible(true)}>Добавить запись ТО</Button>
                <CreateBrand show={brandVisible} onHide={() => {
                    setBrandVisible(false)
                }} onBrandChanged={handleBrandChanged}/>
                <CreateCar show={carVisible} onHide={() => {
                    setCarVisible(false)
                }} onCarAdded={handleCarChanged}/>
                <CreatePart show={partVisible} onHide={() => {
                    setPartVisible(false)
                }}/>
                <CreateMaintenance show={maintenanceVisible} onHide={() => {
                    setMaintenanceVisible(false)
                }}/>
                <ChangeBrand show={brandChangeVisible} onHide={() => {
                    setBrandChangeVisible(false)
                }} onBrandChanged={handleBrandChanged}/>
                <DeleteBrand show={brandDeleteVisible} onHide={() => {
                    setBrandDeleteVisible(false)
                }} onBrandChanged={handleBrandChanged}/>
                <ChangePart show={partChangeVisible} onHide={() => {
                    setPartChangeVisible(false)
                }} onPartChanged={handlePartChanged}/>
                <DeletePart show={partDeleteVisible} onHide={() => {
                    setPartDeleteVisible(false)
                }} onPartChanged={handlePartChanged}/>
                {changeVisible && <ChangeInfoCar show={changeVisible} car_change={selectedCar} onHide={() => {
                    setChangeVisible(false)
                }} onCarChanged={handleCarChanged}/>}
                {deleteVisible && <DeleteCar show={deleteVisible} car_delete={selectedCar} onHide={() => {
                    setDeleteVisible(false)
                }} onCarDeleted={handleCarChanged}/>}
            </div>
            <h2 className={"justify-content-center text-center mt-2 text-white"}>
                Все автомобили
            </h2>
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
                        <td className={"justify-content-between"}>
                            <img style={{cursor: 'pointer'}} width={34} src={edit_icon} alt="BOSS Logo"
                                 onClick={() => handleEditClick(car)}></img>
                            <img style={{cursor: 'pointer', marginLeft: 6}} width={34} src={del_icon} alt="BOSS Logo"
                                 onClick={() => handleDeleteClick(car)}></img>
                        </td>

                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
});

export default Admin;