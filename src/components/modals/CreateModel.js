import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";

import {Context} from "../../index";
import {createModel} from "../../http/modelAPI";
import {observer} from "mobx-react-lite";

const CreateModel = observer (({show, onHide, onModelChanged}) => {
    const {brand} = useContext(Context);


    const [title, setTitle] = React.useState('');
    const [selectedBrand, setSelectedBrand] = useState('Выберите марку автомобиля');
    const [selectedBrandId, setSelectedBrandId] = useState();

    const handleSelect = (brandId, brandTitle) => {
        setSelectedBrand(brandTitle);
        setSelectedBrandId(brandId)
        console.log(brandId);
    };

    const handleSubmit = async () => {
    try {
        await createModel( title,  selectedBrandId );
        onHide(); // Закрытие модального окна после успешного добавления
        onModelChanged();
        resetForm();
    } catch (error) {
        console.error("Ошибка при добавлении модели:", error);
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert('Ошибка при добавлении модели');
        }
    }
};

    const handleClose = () => {
        resetForm();
        onHide(); // Закрытие модального окна после успешного добавления

    };

    const resetForm = () => {
        setTitle('');
        setSelectedBrand('Выберите марку автомобиля');
        setSelectedBrandId(0);
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
                    Добавить новую Модель
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onHide}>
                    <Dropdown>
                        <Dropdown.Toggle>{selectedBrand}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brand.brands.map((brand) => (
                                <Dropdown.Item key={brand.id} onClick={() => handleSelect(brand.id, brand.title)}>
                                    {brand.title}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        placeholder={"Введите название модели автомобиля"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={"mt-2"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateModel;