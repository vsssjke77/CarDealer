import React, {useContext} from 'react';
import {Button, Card, Container, Dropdown, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {CATALOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("USER");

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(username, password);
            } else {
                data = await registration(username, password,role);

            }
            user.setRole(data.role);
            user.setUser(user);
            user.setIsAuth(true)
            navigate(CATALOG_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    }
    const handleSelect = (role) => {
        setRole(role);
    };


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className={"m-auto"}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-4"}
                        placeholder={"Введите логин..."}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className={"mt-4"}
                        placeholder={"Введите пароль..."}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}
                    />
                    {!isLogin && <Dropdown className={"d-flex mt-3"}>
                        <p style={{ paddingTop: 6, display: "flex", margin: 0}} >Выберите роль пользователя</p>
                        <Dropdown.Toggle style={{marginLeft: 10}}>{role}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item  onClick={() => handleSelect("ADMIN")}>
                                Администратор
                            </Dropdown.Item>
                            <Dropdown.Item  onClick={() => handleSelect("USER")}>
                                Обычный пользователь
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>}
                    <Row className={"d-flex justify-content-between mt-3"}>
                        {isLogin ?
                            <div style={{width: "auto"}}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div style={{width: "auto"}}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войди!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            style={{width: "auto"}}
                            className={"me-lg-2"}
                            onClick={click}
                        >
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                    </Row>

                </Form>
            </Card>

        </Container>
    );
});

export default Auth;