import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {check} from "./http/userAPI";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        check().then(data => {

            user.setId(data.id);
            user.setRole(data.role)
            user.setUser(true);
            user.setIsAuth(true);
        })
            .catch(e => {
                console.log(e.message)
            })
            .finally(() => setLoading(false))

    }, [user]);

    if (loading){
        return (
            <div style={{display: 'flex', color:"white", justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Spinner style={{width: 100, height: 100}} animation={"border"}/>
            </div>
        );
    }
    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
