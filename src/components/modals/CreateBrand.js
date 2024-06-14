import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../http/brandAPI";

const CreateBrand = ({show, onHide, onBrandChanged}) => {
    const [title, setTitle] = React.useState('');

    const handleSubmit = async () => {
        try {
            const data = await createBrand(title);
            console.log(data); // Добавьте обработку результата, если необходимо
            onHide(); // Закрытие модального окна после успешного добавления
            onBrandChanged();
            setTitle('');
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
                    Добавить новую Марку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onHide}>
                    <Form.Control
                        placeholder={"Введите название марки автомобиля"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

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

export default CreateBrand;