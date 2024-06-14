import React, {useContext, useEffect} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { fetchParts} from "../../http/partAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {deleteMaintenance} from "../../http/maintenanceAPI";

const ChangeBrand = observer(({show, maintenance_item, onHide, onDeleteMaintenance,onDataChanged}) => {
    const {part} = useContext(Context);

    useEffect(() => {
        fetchParts().then(data => part.setParts(data));
    }, [part]);


    const handleSubmit = async () => {
        try {
            await deleteMaintenance(maintenance_item.id);
            onDeleteMaintenance();
            onDataChanged();
            onHide();
        } catch (error) {
            console.error("Ошибка при обновлении детали:", error);
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
                    Удалить запись
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Вы уверены, что хотите удалить данную запись?
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Нет</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Да</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeBrand;
