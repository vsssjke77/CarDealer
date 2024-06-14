import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Context} from "../../index";

import {updateCar} from "../../http/carAPI";

const CancelReserve = ({show, onHide, car_item, onSubmit}) => {
    const {car, brand, user} = useContext(Context)

    const handleSubmit = () => {
        const formDataE = new FormData();
        formDataE.append("status", 'available');
        formDataE.append("user_id", 0);
        updateCar(car_item.id, formDataE).then(data => {
            onHide();
            onSubmit();
        }).catch(error => {
            console.error('Ошибка отмены записи:', error.message);
        });
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Отмена записи на тест драйв </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы уверены что хотите отменить запись на тест драйв
                машины {brand.getBrandTitleById(car_item.brand_id) + ' ' + car_item.model}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Нет
                </Button>
                <Button variant="primary" onClick={handleSubmit}>Да</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CancelReserve;