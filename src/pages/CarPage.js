import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Spinner, Table} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {Context} from "../index";
import AcceptReserve from "../components/modals/AcceptReserve";
import {useParams} from "react-router-dom";
import {fetchMaintenancesForCar} from "../http/maintenanceAPI";
import {fetchBrands} from "../http/brandAPI";
import {fetchParts} from "../http/partAPI";
import {fetchCars, fetchOneCar} from "../http/carAPI";
import edit_icon from "../assets/edit_icon.png"
import del_icon from "../assets/del_icon.png"
import ChangeMaintenance from "../components/modals/ChangeMaintenance";
import DeleteMaintenance from "../components/modals/DeleteMaintenance";
import {observer} from "mobx-react-lite";
import {fetchModels} from "../http/modelAPI";
import {fetchReservesForCar, fetchReservesForUser} from "../http/reserveAPI";


const CarPage = observer(() => {
    const {user, brand, part,model,reserve} = useContext(Context);
    const [reserveVisible, setReserveVisible] = useState(false);
    const [carMaintenance, setCarMaintenance] = useState([]);

    const [car_item, setCar] = useState({});

    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const [changeMaintenanceVisible, setChangeMaintenanceVisible] = useState(false);
    const [deleteMaintenanceVisible, setDeleteMaintenanceVisible] = useState(false);

    const [dataChanged, setDataChanged] = useState(false); // Состояние для отслеживания изменений в данных

    const {id} = useParams();

    useEffect(() => {
        fetchOneCar(id).then(data => {
            setCar(data);
        });
    }, [id]);

    useEffect(() => {
        fetchBrands().then(data => brand.setBrands(data))
        fetchModels().then(data => model.setModels(data))
        fetchMaintenancesForCar(id).then(data => setCarMaintenance(data))
        fetchParts().then(data => part.setParts(data))
        fetchReservesForCar(id).then(data => reserve.setReservesForCar(data));
            fetchReservesForUser(user.id).then(data => reserve.setReservesForUser(data));
        setDataChanged(false);
    }, [id, brand, part, dataChanged,reserve,car_item,user]);




    if (!car_item.id) {
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
    const handleEditClick = (maintenance) => {
        setChangeMaintenanceVisible(true); // Показать модальное окно изменения информации о машине
        setSelectedMaintenance(maintenance); // Сохранить выбранную машину в состоянии
    };
    const handleDeleteClick = (maintenance) => {
        setDeleteMaintenanceVisible(true); // Показать модальное окно изменения информации о машине
        setSelectedMaintenance(maintenance); // Сохранить выбранную машину в состоянии
    };

    const handleMaintenanceChanged = () => {
        setDataChanged(!dataChanged); // Обновляем состояние для вызова useEffect
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

    const handleDataChanged = () => {
        setDataChanged(!dataChanged); // Обновляем состояние для вызова useEffect
    };


    return (

        <Container className=" mt-4">

            <Row className="justify-content-between">
                <Col md={4}>
                    <h2 style={{color: 'white'}}>{brand.getBrandTitleById(car_item.brand_id) + ' ' + model.getModelTitleById(car_item.model_id)} </h2>
                    <h2 style={{color: 'white'}} className={"mt-2"}>{car_item.price.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        maximumFractionDigits: 0
                    })}
                    </h2>
                    <h2 style={{color: 'white'}} className={"mt-2"}>Характеристики</h2>
                    <p style={{color: 'white'}}>Год производства:{" " + car_item.year}</p>
                    <p style={{color: 'white'}}>Мощность двигателя (л.с.):{" " + car_item.horses}</p>
                    <p style={{color: 'white'}}>Vin номер:{" " + formatVin(car_item.vin)}</p>
                    <p style={{color: 'white'}}>Пробег:{" " + car_item.mileage + ' км'}</p>

                    {user.isAuth && !user.isAdmin && car_item  &&
                        <Button className={"mb-2"} style={{width: "80%"}} onClick={() => setReserveVisible(true)}>Записаться
                            на тест–драйв</Button>}
                    <AcceptReserve show={reserveVisible} onHide={() => {
                        setReserveVisible(false)
                    }} user_id={user.id} car_item={car_item} onSubmit={handleDataChanged}/>
                    {selectedMaintenance && <ChangeMaintenance
                        show={changeMaintenanceVisible}

                        onHide={() => {
                            setChangeMaintenanceVisible(false)
                        }}
                        maintenance_item={selectedMaintenance}
                        onChangeMaintenance={handleEditClick}
                        car_item={car_item}
                        onDataChanged={handleMaintenanceChanged}/>}
                    {selectedMaintenance && <DeleteMaintenance
                        show={deleteMaintenanceVisible}
                        onHide={() => {
                            setDeleteMaintenanceVisible(false)
                        }}
                        maintenance_item={selectedMaintenance}
                        onDeleteMaintenance={handleDeleteClick}
                        onDataChanged={handleMaintenanceChanged}/>}

                </Col>
                <Col md={8}>
                    <Image style={{width: "100%", borderRadius: 10}} src={process.env.REACT_APP_API_URL + car_item.img}/>
                </Col>
            </Row>
            <Row className="mt-4">
                <h2 style={{color: 'white', textAlign: "center"}}>История обслуживания</h2>
                <Table style={{border: "1px solid white"}} responsive="sm">
                    <thead>
                    <tr>
                        <th style={{color: 'white', backgroundColor: "transparent"}}>#</th>
                        <th style={{color: 'white', backgroundColor: "transparent"}}>Дата</th>
                        <th style={{color: 'white', backgroundColor: "transparent"}}>Деталь</th>
                        <th style={{color: 'white', backgroundColor: "transparent"}}>Количество</th>
                        <th style={{color: 'white', backgroundColor: "transparent"}}>Цена за единицу</th>
                        <th style={{color: 'white', backgroundColor: "transparent"}}>Итого</th>
                        {user.isAdmin ? <td className={"d-flex justify-content-center"} style={{
                            color: 'white',
                            backgroundColor: "transparent"
                        }}>Действия</td> : null}
                    </tr>
                    </thead>
                    <tbody>
                    {carMaintenance.map((maintenance, index) => {
                        const partName = part.getPartNameById(maintenance.part_id);
                        const pricePerUnit = part.getPartPriceById(maintenance.part_id);
                        const totalCost = maintenance.count * pricePerUnit;
                        return (
                            <tr key={maintenance.id}>
                                <td style={{color: 'white', backgroundColor: "transparent"}}>{index + 1}</td>
                                <td style={{
                                    color: 'white',
                                    backgroundColor: "transparent"
                                }}>{maintenance.install_date}</td>
                                <td style={{color: 'white', backgroundColor: "transparent"}}>{partName}</td>
                                <td style={{color: 'white', backgroundColor: "transparent"}}>{maintenance.count}</td>
                                <td style={{
                                    color: 'white',
                                    backgroundColor: "transparent"
                                }}>{pricePerUnit.toLocaleString('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                    maximumFractionDigits: 0
                                })}</td>
                                <td style={{
                                    color: 'white',
                                    backgroundColor: "transparent"
                                }}>{totalCost.toLocaleString('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                    maximumFractionDigits: 0
                                })}</td>
                                {user.isAdmin ? <td style={{color: 'white', backgroundColor: "transparent"}}
                                                    className={"d-flex justify-content-center"}>
                                    <img style={{cursor: 'pointer'}} width={34} src={edit_icon} alt="BOSS Logo"
                                         onClick={() => handleEditClick(maintenance)}></img>
                                    <img style={{cursor: 'pointer', marginLeft: 12}} width={34} src={del_icon}
                                         alt="BOSS Logo"
                                         onClick={() => handleDeleteClick(maintenance)}></img>
                                </td> : null}
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Row>


        </Container>
    );
});

export default CarPage;