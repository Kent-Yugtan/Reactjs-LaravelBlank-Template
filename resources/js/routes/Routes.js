import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// COMPANY INFO
import companyInfo from "../components/Providers/companyInfo";

// LAYOUTS
import PublicLayout from "../components/Layouts/Public/Public";
import PrivateLayout from "../components/Layouts/Private/Private";

// Views

// ERROR VIEWS NOT FOUND
import NotFound from "../components/views/error/NotFound";

// PUBLIC VIEWS LOGIN
import Login from "../components/views/Public/Login";
// PUBLIC VIEWS Signup
import Signup from "../components/views/Public/Signup";

const queryClient = new QueryClient();
const isLoggedIn = localStorage.getItem("token");
const userRole = companyInfo().userRole;

const PublicRoute = ({ component: Component, title: Title, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            !isLoggedIn ? (
                <PublicLayout title={Title}>
                    <Component {...props} />
                </PublicLayout>
            ) : (
                <Redirect to={{ pathname: "/adminDashboard" }} />
            )
        }
    />
);

const PrivateRoute = ({
    component: Component,
    title: Title,
    userRole: UserRole,
    admin: Admin,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            isLoggedIn ? (
                <PrivateLayout title={Title} userRole={UserRole} admin={Admin}>
                    <Component {...props} userRole={UserRole} admin={Admin} />
                </PrivateLayout>
            ) : (
                <Redirect to={{ pathname: "/" }} />
            )
        }
    />
);

function Routes() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Switch>
                    <PublicRoute
                        exact
                        path={"/login"}
                        title="Login"
                        component={Login}
                    />
                    <PublicRoute
                        exact
                        path="/signup"
                        title="Registation"
                        component={Signup}
                    />
                    {/* 

                    <PublicRoute
                        exact
                        path="/signup/message"
                        title="Registation"
                        component={SignupMessage}
                    />

                    <PrivateRoute
                        exact
                        path="/adminDashboard"
                        title="Admin Dashboard"
                        userRole={userRole}
                        component={adminDashboard}
                    />

                    <PrivateRoute
                        exact
                        path="/adminUser"
                        title="Admin Users"
                        userRole={userRole}
                        component={userView}
                    />

                    <PrivateRoute
                        exact
                        path="/adminEdit"
                        title="Admin Users"
                        userRole={userRole}
                        component={userEdit}
                    /> */}

                    <Route path="/*" component={NotFound} />
                </Switch>
            </Router>
        </QueryClientProvider>
    );
}

export default Routes;
if (document.getElementById("root")) {
    ReactDOM.render(<Routes />, document.getElementById("root"));
}
