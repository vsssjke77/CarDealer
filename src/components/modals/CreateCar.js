import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {createCar} from "../../http/carAPI";
import {observer} from "mobx-react-lite";

const CreateCar = observer(({show, onHide, onCarAdded }) => {
    const {brand} = useContext(Context);
    const [selectedBrand, setSelectedBrand] = useState('Выберите марку автомобиля');
    const [selectedBrandId, setSelectedBrandId] = useState(0);
    const [model, setModel] = useState('')
    const [price, setPrice] = useState(0)
    const [year, setYear] = useState(0)
    const [horses, setHorses] = useState(0)
    const [vin, setVin] = useState('')
    const [mileage, setMileage] = useState(0)
    const [file, setFile] = useState(null)

    const handleSelect = (brandId, brandTitle) => {
        setSelectedBrand(brandTitle);
        setSelectedBrandId(brandId)
    };

    const selectFile = e => {
        // Получаем первый выбранный файл из объекта FileList
        setFile(e.target.files[0]);
    };


    const addCar = () => {
        const formData = new FormData();
        formData.append("brand_id", selectedBrandId);
        formData.append("model", model);
        formData.append("price", `${price}`);
        formData.append("year", `${year}`);
        formData.append("horses", `${horses}`);
        formData.append("vin", vin);
        formData.append("mileage", `${mileage}`);
        formData.append("img", file);
        createCar(formData).then(data => onHide());
        onCarAdded();
        onHide();
        setSelectedBrand('Выберите марку автомобиля');
        setModel();
        setPrice();
        setYear();
        setHorses();
        setVin('');
        setMileage();
        setFile(null);


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
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите модель автомобиля"}
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите цену автомобиля"}
                        type={"number"}
                        value={price === 0 ? '' : price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите год автомобиля"}
                        type={"number"}
                        value={year === 0 ? '' : year}
                        onChange={(e) => setYear(Number(e.target.value))}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите мощность (л.с) автомобиля"}
                        type={"number"}
                        value={horses===0 ? '' : horses}
                        onChange={(e) => setHorses(Number(e.target.value))}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите vin номер автомобиля"}
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                    />
                    <Form.Control
                        className={'mt-2'}
                        placeholder={"Введите пробег автомобиля"}
                        type={"number"}
                        value={mileage === 0 ? '' : mileage}
                        onChange={(e) => setMileage(Number(e.target.value)) }
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
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addCar}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCar;