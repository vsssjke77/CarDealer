import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {updateBrand} from "../../http/brandAPI";
import {Context} from "../../index";

const ChangeBrand = ({show, onHide, onBrandChanged}) => {
    const {brand} = useContext(Context)
    const [title, setTitle] = React.useState('');
    const [selectedBrand, setSelectedBrand] = React.useState('Выбрите бренд');
    const [selectedBrandId, setSelectedBrandId] = useState(0);


    const handleSelect = (brandId, brandTitle) => {
        setSelectedBrand(brandTitle);
        setSelectedBrandId(brandId)
    };
    const handleSubmit = async () => {
        try {
            await updateBrand(selectedBrandId,title);
            setSelectedBrand('Выбрите бренд');
            setTitle('');
            onHide(); // Закрытие модального окна после успешного добавления
            onBrandChanged();
        } catch (error) {
            console.error("Ошибка при добавлении записи ТО:", error);
            // Добавьте обработку ошибки, если необходимо
        }
    };
    const handleExit = async () => {
        onHide();
        setSelectedBrand('Выбрите бренд');
        setTitle('');
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
                    Изменить марку
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
                        placeholder={"Введите название марки автомобиля"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={handleExit } >Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeBrand;