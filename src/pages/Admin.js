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
import {fetchModels} from "../http/modelAPI";
import CreateModel from "../components/modals/CreateModel";
import ChangeModel from "../components/modals/ChangeModel";
import DeleteModel from "../components/modals/DeleteModel";
import {fetchParts} from "../http/partAPI";


const Admin = observer(() => {
    const {car, brand,model,part} = useContext(Context);
    const navigate = useNavigate()

    const [brandVisible, setBrandVisible] = useState(false);
    const [brandChangeVisible, setBrandChangeVisible] = useState(false);
    const [brandDeleteVisible, setBrandDeleteVisible] = useState(false);
    const [modelVisible, setModelVisible] = useState(false);
    const [modelChangeVisible, setModelChangeVisible] = useState(false);
    const [modelDeleteVisible, setModelDeleteVisible] = useState(false);
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
        fetchModels().then(data => model.setModels(data))
        fetchParts().then(data => part.setParts(data));
        fetchCars().then(data => car.setCars(data.rows))
        setDataChanged(false);
    }, [brand, car, dataChanged,part]);

    const handleEditClick = (car) => {
        setChangeVisible(true); // Показать модальное окно изменения информации о машине
        setSelectedCar(car); // Сохранить выбранную машину в состоянии
    };
    const handleDeleteClick = (car) => {
        setDeleteVisible(true); // Показать модальное окно изменения информации о машине
        setSelectedCar(car); // Сохранить выбранную машину в состоянии
    };

    const handleDataChanged = () => {
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
                <Dropdown as={ButtonGroup}>

                    <Dropdown.Toggle variant="light"
                                     id="dropdown-split-basic">{"Выберите действие с моделями"}</Dropdown.Toggle>

                    <Dropdown.Menu style={{width:'100%'}}>
                        <Dropdown.Item onClick={() => setModelVisible(true)}>Добавить модель автомобиля</Dropdown.Item>
                        <Dropdown.Item onClick={() => setModelChangeVisible(true)}>Изменить модель
                            автомобиля</Dropdown.Item>
                        <Dropdown.Item onClick={() => setModelDeleteVisible(true)}>Удалить модель
                            автомобиля</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>

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

                <CreateBrand show={brandVisible} onHide={() => {
                    setBrandVisible(false)
                }} onBrandChanged={handleDataChanged}/>
                <CreateModel show={modelVisible} onHide={() => {
                    setModelVisible(false)
                }} onModelChanged={handleDataChanged}/>



                <CreatePart show={partVisible} onHide={() => {
                    setPartVisible(false)
                }} onPartChanged={handleDataChanged}/>

                <ChangeBrand show={brandChangeVisible} onHide={() => {
                    setBrandChangeVisible(false)
                }} onBrandChanged={handleDataChanged}/>
                <DeleteBrand show={brandDeleteVisible} onHide={() => {
                    setBrandDeleteVisible(false)
                }} onBrandChanged={handleDataChanged}/>
                <ChangeModel show={modelChangeVisible} onHide={() => {
                    setModelChangeVisible(false)
                }} onModelChanged={handleDataChanged}/>
                <DeleteModel show={modelDeleteVisible} onHide={() => {
                    setModelDeleteVisible(false)
                }} onModelChanged={handleDataChanged}/>
                <ChangePart show={partChangeVisible} onHide={() => {
                    setPartChangeVisible(false)
                }} onPartChanged={handleDataChanged}/>
                <DeletePart show={partDeleteVisible} onHide={() => {
                    setPartDeleteVisible(false)
                }} onPartChanged={handleDataChanged}/>
                {changeVisible && <ChangeInfoCar show={changeVisible} car_change={selectedCar} onHide={() => {
                    setChangeVisible(false)
                }} onCarChanged={handleDataChanged}/>}
                {deleteVisible && <DeleteCar show={deleteVisible} car_delete={selectedCar} onHide={() => {
                    setDeleteVisible(false)
                }} onCarDeleted={handleDataChanged}/>}
            </div>
            <div className="text-center d-flex justify-content-around mt-3">
                <Button variant={"light"} onClick={() => setCarVisible(true)}>Добавить автомобиль</Button>
                <Button variant={"light"} onClick={() => setMaintenanceVisible(true)}>Добавить запись ТО</Button>
                <CreateCar show={carVisible} onHide={() => {
                    setCarVisible(false)
                }} onCarAdded={handleDataChanged}/>
                <CreateMaintenance show={maintenanceVisible} onHide={() => {
                    setMaintenanceVisible(false)
                }}/>
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
                        <td>{model.getModelTitleById(car.model_id)}</td>
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