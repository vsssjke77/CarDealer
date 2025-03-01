import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {updateCar} from "../../http/carAPI";
import {fetchModelsForBrand} from "../../http/modelAPI";
import {observer} from "mobx-react-lite";

const ChangeInfoCar = observer(({show, onHide, car_change, onCarChanged}) => {

    const {car, brand, model} = useContext(Context);
    const [selectedStatus, setSelectedStatus] = useState(car_change.status);
    const [selectedBrand, setSelectedBrand] = useState(brand.getBrandTitleById(car_change.brand_id));

    const [selectedBrandId, setSelectedBrandId] = useState(car_change.brand_id);
    const [selectedModel, setSelectedModel] = useState(model.getModelTitleById(car_change.model_id));
    const [selectedModelId, setSelectedModelId] = useState(car_change.model_id)
    const [price, setPrice] = useState(car_change.price)
    const [year, setYear] = useState(car_change.year)
    const [horses, setHorses] = useState(car_change.horses)
    const [vin, setVin] = useState(car_change.vin)
    const [mileage, setMileage] = useState(car_change.mileage)
    const [file, setFile] = useState(null)


    useEffect(() => {
            fetchModelsForBrand(selectedBrandId).then(data => model.setModelsForBrand(data))
        }
        , [model]);

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        // Здесь вы можете добавить логику для обновления статуса автомобиля в вашем хранилище или базе данных
    };


    const handleSelect = async (brandId, brandTitle) => {
        setSelectedBrand(brandTitle);
        setSelectedBrandId(brandId);
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

    const editCar = async () => {
        const formDataE = new FormData();
        formDataE.append("brand_id", selectedBrandId);
        formDataE.append("model_id", selectedModelId);
        formDataE.append("price", `${price}`);
        formDataE.append("year", `${year}`);
        formDataE.append("horses", `${horses}`);
        formDataE.append("vin", vin);
        formDataE.append("mileage", `${mileage}`);
        formDataE.append("status", selectedStatus);
        formDataE.append("img", file);
        try {
            await updateCar(car_change.id, formDataE).then(data => onHide());
            onCarChanged();
            onHide();
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
                    Изменить данные об автомобиле
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onHide}>
                    <div className=" d-flex align-content-center" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 20, width: "20%"}}>Марка:</div>
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

                    <div className="mt-1 d-flex align-content-center" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 20, width: "20%"}}>
                            Модель:
                        </div>
                        <Dropdown className={"mt-2"}>
                            <Dropdown.Toggle>{selectedModel}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {model.modelsForBrand.map((model) => (
                                    <Dropdown.Item key={model.id}
                                                   onClick={() => handleSelectModel(model.id, model.title)}>
                                        {model.title}
                                    </Dropdown.Item>
                                ))}

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>


                    <div className=" mt-2 d-flex align-content-center" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 20, width: "25%"}}>Цена:</div>
                        <Form.Control

                            placeholder={"Введите цену автомобиля"}
                            type={"number"}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className=" mt-2 d-flex align-content-center" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 20, width: "25%"}}>Год:</div>
                        <Form.Control

                            placeholder={"Введите год производства автомобиля"}
                            type={"number"}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className=" mt-2 d-flex align-content-center" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 20, width: "25%"}}>Мощность
                            (л.с):
                        </div>
                        <Form.Control

                            className={''}
                            placeholder={"Введите мощность автомобиля (л.с)"}
                            type={"number"}
                            value={horses}
                            onChange={(e) => setHorses(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className=" mt-2 d-flex align-content-center" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 20, width: "25%"}}>Vin номер:</div>
                        <Form.Control


                            placeholder={"Введите vin номер автомобиля"}
                            value={vin}
                            onChange={(e) => setVin(e.target.value)}
                            onKeyDown={handleKeyDownVin}
                        />
                    </div>

                    <div className=" mt-2 d-flex align-content-center" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 20, width: "25%"}}>Пробег:</div>
                        <Form.Control


                            placeholder={"Введите пробег автомобиля"}
                            type={"number"}
                            value={mileage}
                            onChange={(e) => setMileage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className=" mt-2 d-flex align-content-center" style={{gap: 4}}>
                        <div style={{display: "flex", alignSelf: "center", fontSize: 20, width: "20%"}}>Статус:</div>
                        <Dropdown className={"mt-2"}>
                            <Dropdown.Toggle>{selectedStatus || 'Выберите статус автомобиля'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {car.statuses.map((status, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleSelectStatus(status)}>
                                        {status}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

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
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={editCar}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeInfoCar;


/*<Dropdown>
                        <Dropdown.Toggle>{selectedCar}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {car.cars.map((cars) => (
                                <Dropdown.Item key={cars.id} onClick={() => handleSelect(brand.getBrandTitleById(cars.brand_id), cars.model, cars.vin)}>
                                    {brand.getBrandTitleById(cars.brand_id) + ' ' + cars.model + ' ' + cars.vin}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={"mt-3"}>
                    <Dropdown.Toggle>{selectedStatus || 'Выберите статус автомобиля'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {car.statuses.map((status, index) => (
                                <Dropdown.Item key={index} onClick={() => handleSelectStatus(status)}>
                                    {status}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>*/