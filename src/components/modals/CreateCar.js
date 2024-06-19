import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {createCar} from "../../http/carAPI";
import {observer} from "mobx-react-lite";
import {fetchModelsForBrand} from "../../http/modelAPI";

const CreateCar = observer(({show, onHide, onCarAdded}) => {
    const {brand, model} = useContext(Context);
    const [selectedBrand, setSelectedBrand] = useState('Выберите марку автомобиля');
    const [selectedBrandId, setSelectedBrandId] = useState(0);
    const [selectedModel, setSelectedModel] = useState('Выберите модель автомобиля')
    const [selectedModelId, setSelectedModelId] = useState(0)
    const [price, setPrice] = useState(0)
    const [year, setYear] = useState(0)
    const [horses, setHorses] = useState(0)
    const [vin, setVin] = useState('')
    const [mileage, setMileage] = useState(0)
    const [file, setFile] = useState(null)

    const handleSelect = async (brandId, brandTitle) => {
        setSelectedBrand(brandTitle);
        setSelectedBrandId(brandId)
        const models = await fetchModelsForBrand(brandId);
        model.setModelsForBrand(models);
        setSelectedModel('Выберите модель автомобиля'); // Reset model selection when brand changes
        setSelectedModelId(null);

    };
    const handleSelectModel = (modelId, modelTitle) => {
        setSelectedModel(modelTitle);
        setSelectedModelId(modelId)

    };

    const selectFile = e => {
        // Получаем первый выбранный файл из объекта FileList
        setFile(e.target.files[0]);
    };

    const handleKeyDown = (e) => {
        if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+'|| e.key === '/' || e.key === '*') {
            e.preventDefault();
        }
    };
    const handleKeyDownVin = (e) => {
        if (e.key === '-' || e.key === '+' || e.key === '/' || e.key === '*') {
            e.preventDefault();
        }
    };

    const handleClose = () => {
        onHide();
        setSelectedBrand('Выберите марку автомобиля');
        setSelectedModel('Выберите модель автомобиля');
        setPrice(0);
        setYear(0);
        setHorses(0);
        setVin('');
        setMileage(0);
        setFile(null);
    }


    const addCar = async () => {
        const formData = new FormData();
        formData.append("brand_id", selectedBrandId);
        formData.append("model_id", selectedModelId);
        formData.append("price", `${price}`);
        formData.append("year", `${year}`);
        formData.append("horses", `${horses}`);
        formData.append("vin", vin);
        formData.append("status", 'available');
        formData.append("mileage", `${mileage}`);
        formData.append("img", file);
        try {
            await createCar(formData).then(data => onHide());
            onCarAdded();
            onHide();
            setSelectedBrand('Выберите марку автомобиля');
            setSelectedModel('Выберите модель автомобиля');
            setPrice(0);
            setYear(0);
            setHorses(0);
            setVin('');
            setMileage(0);
            setFile(null);
        } catch (e) {
            alert(e.response.data.message);
        }


    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый автомобиль
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
                    <Dropdown className={"mt-2"}>
                        <Dropdown.Toggle>{selectedModel}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {model.modelsForBrand.map((model) => (
                                <Dropdown.Item key={model.id} onClick={() => handleSelectModel(model.id, model.title)}>
                                    {model.title}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите цену автомобиля"}
                        type={"number"}
                        value={price === 0 ? '' : price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        onKeyDown={handleKeyDown}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите год автомобиля"}
                        type={"number"}
                        value={year === 0 ? '' : year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        onKeyDown={handleKeyDown}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите мощность (л.с) автомобиля"}
                        type={"number"}
                        value={horses === 0 ? '' : horses}
                        onChange={(e) => setHorses(Number(e.target.value))}
                        onKeyDown={handleKeyDown}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите vin номер автомобиля"}
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        onKeyDown={handleKeyDownVin}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите пробег автомобиля"}
                        type={"number"}
                        value={mileage === 0 ? '' : mileage}
                        onChange={(e) => setMileage(Number(e.target.value))}
                        onKeyDown={handleKeyDown}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Загрузите фото автомобиля"}
                        type={"file"}
                        onChange={selectFile} // Обработчик изменения файла
                    />
                    <br/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addCar}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCar;