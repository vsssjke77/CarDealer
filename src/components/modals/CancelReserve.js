import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {format} from 'date-fns'; // Импорт функции format

import {observer} from "mobx-react-lite";
import {deleteReserve} from "../../http/reserveAPI";

const CancelReserve = observer (({show, onHide, car_item, onSubmit, reserve_item}) => {
    const {brand, model} = useContext(Context)

    const handleSubmit = async () => {
        try{
            await deleteReserve(reserve_item.id);
        onHide();
        onSubmit();
        }catch(error){
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ошибка при удалении резервации');
            }
        }

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
                машины {brand.getBrandTitleById(car_item.brand_id) + ' ' + model.getModelTitleById(car_item.model_id)} c {format(new Date(reserve_item.start_date), 'dd.MM.yyyy HH:mm')} до {format(new Date(reserve_item.end_date), 'dd.MM.yyyy HH:mm')}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Нет
                </Button>
                <Button variant="primary" onClick={handleSubmit}>Да</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CancelReserve;