import {ADMIN_ROUTE, CAR_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Admin from "./pages/Admin";
import Catalog from "./pages/Catalog";
import CarPage from "./pages/CarPage";
import Auth from "./pages/Auth";
import OrderPage from "./pages/OrderPage";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]
export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: CAR_ROUTE + '/:id',
        Component: CarPage
    }
]

export const authRoutes = [
    {
        path: ORDER_ROUTE,
        Component: OrderPage
    }
]