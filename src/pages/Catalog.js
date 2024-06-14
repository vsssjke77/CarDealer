import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import FilterBar from "../components/FilterBar";
import CarList from "../components/CarList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchParts} from "../http/partAPI";

const Catalog = observer( () => {

    const {part} = useContext(Context);

    useEffect(() => {
        fetchParts().then(data => part.setParts(data))
    }, [part]);

    return (
        <Container style={{ paddingTop: "20px"}}>
            <Row>
                <Col md={3}>
                    <FilterBar/>
                </Col>
                <Col md={9}>
                    <CarList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Catalog;