import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Context} from "../../index";

import {updateCar} from "../../http/carAPI";

const AcceptReserve = ({show, onHide, user_id,car_item, onSubmit}) => {
    const {car,brand,user} = useContext(Context)

    const handleSubmit = () => {
        const formDataE = new FormData();
        formDataE.append("status", 'reserved');
        formDataE.append("user_id", user_id);
        updateCar(car_item.id, formDataE).then(data => onHide());
        onSubmit();
        onHide();
    }



    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Запись на тест драйв </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы уверены что хотите записаться на тест драйв машины {brand.getBrandTitleById(car_item.brand_id) + ' ' + car_item.model }?
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

export default AcceptReserve;