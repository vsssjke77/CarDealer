import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {updatePart, fetchParts} from "../../http/partAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ChangeBrand = observer(({show, onHide, onPartChanged}) => {
    const {part} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedPart, setSelectedPart] = useState(null);



    const handleSelect = (part) => {
        setSelectedPart(part);
        setName(part.name);
        setPrice(part.price);
    };

    const handleSubmit = async () => {
        try {
            await updatePart(selectedPart.id, name, price);
            setSelectedPart(null);
            setName('');
            setPrice('');
            onHide();
            onPartChanged();
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleExit = () => {
        onHide();
        setSelectedPart(null);
        setName('');
        setPrice('');
    };

    const handleKeyDown = (e) => {
        if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+'|| e.key === '/' || e.key === '*') {
            e.preventDefault();
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleExit}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить деталь
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{selectedPart ? selectedPart.name : 'Выберите деталь'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {part.parts.map((part) => (
                                <Dropdown.Item key={part.id} onClick={() => handleSelect(part)}>
                                    {part.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите название детали"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите цену детали"}
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={handleExit}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeBrand;
