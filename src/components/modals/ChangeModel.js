import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";

import {Context} from "../../index";
import {fetchModelsForBrand, updateModel} from "../../http/modelAPI";
import {observer} from "mobx-react-lite";

const ChangeModel = observer (({show, onHide, onModelChanged}) => {
    const {brand, model} = useContext(Context);


    const [title, setTitle] = React.useState('');
    const [selectedBrand, setSelectedBrand] = useState('Выберите марку автомобиля');
    const [selectedBrandId, setSelectedBrandId] = useState(0);
    const [selectedModel, setSelectedModel] = useState('Выберите модель автомобиля')
    const [selectedModelId, setSelectedModelId] = useState(0)
    const [newSelectedBrand, setNewSelectedBrand] = useState(selectedBrand);
    const [newSelectedBrandId, setNewSelectedBrandId] = useState(0);
    const handleSelect = async (brandId, brandTitle) => {
        setSelectedBrand(brandTitle);
        setSelectedBrandId(brandId)
        const models = await fetchModelsForBrand(brandId);
        model.setModelsForBrand(models);
        setSelectedModel('Выберите модель автомобиля'); // Reset model selection when brand changes
        setSelectedModelId(0);

    };
    const handleSelectNew = (brandId, brandTitle) => {
        setNewSelectedBrand(brandTitle);
        setNewSelectedBrandId(brandId)
    };

    const handleSelectModel = (modelId, modelTitle) => {
        setSelectedModel(modelTitle);
        setSelectedModelId(modelId)

    };
    const handleClose = () => {
        resetForm();
        onHide(); // Закрытие модального окна после успешного добавления

    };

    const handleSubmit = async () => {
    try {
        await updateModel(selectedModelId, title, newSelectedBrandId);
        resetForm();
        onHide(); // Закрытие модального окна после успешного обновления
        onModelChanged();

    } catch (error) {
        console.error("Ошибка при изменении модели:", error);
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert('Ошибка при изменении модели');
        }
    }
};

    const resetForm = () => {
        setTitle('');
        setSelectedBrand('Выберите марку автомобиля');
        setSelectedBrandId(0);
        setSelectedModel('Выберите модель автомобиля');
        setSelectedModelId(0);
        setNewSelectedBrand('Выберите марку автомобиля');
        setNewSelectedBrandId(0);
        model.setModelsForBrand([]);
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
                    Изменить модель
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onHide}>
                    <div className=" d-flex align-content-center mt-2" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 16, width: "28%"}}>Марка:</div>
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
                    </div>
                    <div className=" d-flex align-content-center mt-2" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 16, width: "28%"}}>Модель:</div>
                        <Dropdown>
                        <Dropdown.Toggle>{selectedModel}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {model.modelsForBrand.map((model) => (
                                <Dropdown.Item key={model.id} onClick={() => handleSelectModel(model.id, model.title)}>
                                    {model.title}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div className=" d-flex align-content-center mt-2" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 16, width: "28%"}}>Новая марка:</div>
                        <Dropdown>
                        <Dropdown.Toggle>{newSelectedBrand}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brand.brands.map((brand) => (
                                <Dropdown.Item key={brand.id} onClick={() => handleSelectNew(brand.id, brand.title)}>
                                    {brand.title}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div className=" d-flex align-content-center mt-2" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 16, width: "40%"}}>Новое название модели:</div>
                        <Form.Control
                        placeholder={"Введите новое название модели автомобиля"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                    </div>



                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeModel;