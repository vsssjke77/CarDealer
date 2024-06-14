import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {deleteCar} from "../../http/carAPI";

const DeleteCar = ({show, onHide, car_delete, onCarDeleted}) => {
    const delCar = () => {
        deleteCar(car_delete.id);
        onCarDeleted();
        onHide();

    }
    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Удаление {car_delete.vin}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы уверены что вы хотите удалить автомобиль из базы данных?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Нет
                </Button>
                <Button variant="primary" onClick={delCar}>Да</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCar;