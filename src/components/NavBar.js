import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE, ORDER_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import logoBoss from '../assets/logoBoss.png';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setId(undefined);
        user.setIsAuth(false);
        user.setRole('');
        localStorage.removeItem("token");
    };


    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{boxSizing: "border-box", paddingTop: "4"}}>
            <Container>
                <NavLink style={{color: "white", textDecoration: 'none', fontSize: 22}}
                         to={CATALOG_ROUTE}>
                    <img width={36} height={36} src={logoBoss} alt="BOSS Logo" style={{marginRight: 10}}/>
                    BOSS
                </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {user.isAdmin ?
                            <Button className={"me-lg-3"} variant={"outline-light"}
                                    onClick={() => navigate(ADMIN_ROUTE)}>Админ
                                панель</Button>
                            :
                            <Button className={"me-lg-3"} variant={"outline-light"}
                                    onClick={() => navigate(ORDER_ROUTE)}>Мои заказы</Button>
                        }

                        <Button variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => {
                            navigate(LOGIN_ROUTE)
                        }}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;