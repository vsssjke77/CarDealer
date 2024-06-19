import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {updateMaintenance} from "../../http/maintenanceAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ChangeMaintenance = observer(({show, maintenance_item, onHide, onChangeMaintenance,car_item,onDataChanged}) => {
    const {part, car} = useContext(Context);
    const [selectedPartInfo, setSelectedPartInfo] = useState(part.getPartNameById(maintenance_item.part_id) );
    const [selectedCarInfo, setSelectedCarInfo] = useState(car_item.vin);
    const [selectedPart, setSelectedPart] = useState(maintenance_item.part_id);
    const [selectedCar, setSelectedCar] = useState(maintenance_item.car_id);
    const [installationDate, setInstallationDate] = useState(maintenance_item.install_date);
    const [partCount, setPartCount] = useState(maintenance_item.count);

    const handleSelectPart = (id,name) => {
        setSelectedPartInfo(name);
        setSelectedPart(id);
    };
    const handleSelectCar = (id,vin) => {
        setSelectedCarInfo(vin);
        setSelectedCar(id);
    };

    const handleSubmit = async () => {
        try {
            const data = await updateMaintenance(maintenance_item.id,installationDate ,partCount,  selectedCar, selectedPart);
            console.log(data);
            onChangeMaintenance();
            onDataChanged();
            onHide(); // Закрытие модального окна после успешного добавления

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ошибка при изменении записи ТО');
            }
        }
    };



    const handleKeyDown = (e) => {
        if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+'|| e.key === '/' || e.key === '*') {
            e.preventDefault();
        }
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
          size="lg"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новую запись ТО
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onHide}>
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Введите дату установки"}
                        type={"date"}
                        value={installationDate}
                        onChange={(e) => setInstallationDate(e.target.value)}

                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Введите количество деталей"}
                        type={"number"}
                        value={partCount}
                        onChange={(e) => setPartCount(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Dropdown className={"mt-2"}>
                        <Dropdown.Toggle>{selectedPartInfo || 'Выберите деталь'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {part.parts.map((part) => (
                                <Dropdown.Item key={part.id} onClick={() => handleSelectPart(part.id, part.name)}>
                                    {part.name}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className={'mt-2'}>
                        <Dropdown.Toggle>{'vin: ' + selectedCarInfo}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {car.cars.map((car) => (
                                <Dropdown.Item key={car.id} onClick={() => handleSelectCar(car.id, car.vin)}>

                                    {'vin: '+ car.vin}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeMaintenance;
