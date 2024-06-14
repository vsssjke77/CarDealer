import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {createPart} from "../../http/partAPI";

const CreatePart = ({show, onHide}) => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');

    const handleSubmit = async () => {
        try {
            const data = await createPart(name,price);
            console.log(data); // Добавьте обработку результата, если необходимо
            onHide(); // Закрытие модального окна после успешного добавления
        } catch (error) {
            console.error("Ошибка при добавлении записи ТО:", error);
            // Добавьте обработку ошибки, если необходимо
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
                    Добавить новую деталь
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onHide}>
                    <Form.Control
                        placeholder={"Введите название детали"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Введите цену детали"}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePart;