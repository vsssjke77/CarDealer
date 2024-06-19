import React, {useState, useEffect, useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru'; // Импорт локали
import {Context} from "../../index";

import {createReserve, fetchReservesForCar, fetchReservesForUser} from "../../http/reserveAPI";
import {setHours, setMinutes, addHours, isAfter, isBefore, setSeconds, setMilliseconds, setDate} from 'date-fns';
import {observer} from "mobx-react-lite";

// Регистрация локали
registerLocale('ru', ru);

const AcceptReserve = observer(({show, onHide, user_id, car_item, onSubmit}) => {
    const {reserve, brand, model, user} = useContext(Context);
    const [startDate, setStartDate] = useState(setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 10));
    const [endDate, setEndDate] = useState(addHours(startDate, 1));
    const [errorMessage, setErrorMessage] = useState('');


    const isTimeDisabled = (time) => {
        const start = new Date(time);
        const end = addHours(start, 1);

        // Преобразуем даты бронирования в объекты Date
        const reservedTimes = reserve.reservesForCar.map(reserve => ({
            start: new Date(reserve.start_date),
            end: new Date(reserve.end_date)
        }));

        // Проверяем пересечение каждого зарезервированного интервала с текущим временем
        return !reservedTimes.some(reserved => {
            const {start: reservedStart, end: reservedEnd} = reserved;
            return (start >= reservedStart && start < reservedEnd) || (end > reservedStart && end <= reservedEnd);
        });
    };

    const handleSubmit = async () => {
        try {
            const startHours = startDate.getHours();
            const endHours = endDate.getHours();
            const startMinutes = startDate.getMinutes();
            const endMinutes = endDate.getMinutes();

            if (startHours < 10 || endHours > 18 || startMinutes !== 0 || endMinutes !== 0) {
                setErrorMessage('Время начала должно быть не раньше 10:00, время окончания не позже 17:00, и минуты должны быть равны 00.');
                return;
            }

            if (reserve.reservesForUser.length >= 3) {
                setErrorMessage('Вы достигли максимально возможного количества броней автомобилей (3)');
                return;
            }
            const overlappingReservation = reserve.reservesForCar.find(reserve => (
                startDate.getTime() === new Date(reserve.start_date).getTime()
            ));

            const overlappingReservation1 = reserve.reservesForUser.find(reserve => (
                startDate.getTime() === new Date(reserve.start_date).getTime()
            ));

            if (overlappingReservation) {
                setErrorMessage('Машина в выбранное время не доступна');
                return;
            }
            if (overlappingReservation || overlappingReservation1) {
                setErrorMessage('Вы уже забронировали другую машину на это время');
                return;
            }


            // Создание резерва
            await createReserve(startDate, endDate, user_id, car_item.id);


            // Вызов callback и закрытие модального окна
            onSubmit();
            handleClose();
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    const handleClose = () => {
        setStartDate(setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 10))
        setEndDate(setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 11));
        setErrorMessage('');
        onHide();

    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Запись на тест-драйв</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы уверены что хотите записаться на тест-драйв
                машины {brand.getBrandTitleById(car_item.brand_id) + ' ' + model.getModelTitleById(car_item.model_id)}?
                <Form.Group className="mt-3">
                    <Form.Label>Выберите дату и время начала:</Form.Label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            setEndDate(addHours(date, 1));
                        }}
                        showTimeSelect
                        minDate={new Date()}
                        minTime={setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 10)}
                        maxTime={setHours(setMinutes(new Date(), 0), 17)}
                        timeIntervals={60}
                        filterTime={isTimeDisabled}
                        dateFormat="Pp"
                        locale="ru" // Установка локали
                    />
                </Form.Group>
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Нет
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AcceptReserve;
