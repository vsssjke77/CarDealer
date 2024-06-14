import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {deletePart, fetchParts} from "../../http/partAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ChangeBrand = observer(({show, onHide, onPartChanged}) => {
    const {part} = useContext(Context);
    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedPartId, setSelectedPartId] = useState(null);

    useEffect(() => {
        fetchParts().then(data => part.setParts(data));
    }, [part]);

    const handleSelect = (id,part) => {
        setSelectedPart(part);
        setSelectedPartId(id);
    };

    const handleSubmit = async () => {
        try {
            await deletePart(selectedPartId);
            setSelectedPart(null);
            onHide();
            onPartChanged();
        } catch (error) {
            console.error("Ошибка при обновлении детали:", error);
        }
    };

    const handleExit = () => {
        onHide();
        setSelectedPart(null);
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
                    Удалить деталь
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{selectedPart ? selectedPart.name : 'Выберите деталь'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {part.parts.map((part) => (
                                <Dropdown.Item key={part.id} onClick={() => handleSelect(part.id, part)}>
                                    {part.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={handleExit}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeBrand;
