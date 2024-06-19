import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {createPart} from "../../http/partAPI";

const CreatePart = ({show, onHide, onPartChanged}) => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');

    const handleSubmit = async () => {
        try {
            await createPart(name, price);
            setName('');
            setPrice('');
            onPartChanged();
            onHide(); // Закрытие модального окна после успешного добавления
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleClose = () => {
        setName('');
        setPrice('');
        onHide(); // Закрытие модального окна после успешного добавления

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
                        onKeyDown={handleKeyDown}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePart;