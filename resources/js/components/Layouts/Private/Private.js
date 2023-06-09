import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout } from "antd";
import { GET, UPDATE } from "../../Providers/useAxiosQuery";
import Sidemenu from "./Sidemenu";
import Header from "./Header";
import Footer from "./Footer";
import companyInfo from "../../Providers/companyInfo";

const name = companyInfo().name;

const Private = (props) => {
    const { title, children, userRole, admin } = props;
    const history = useHistory();
    const [sideMenuCollapse, setSideMenuCollapse] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const toggleSideMenuCollapse = () => {
        setSideMenuCollapse(!sideMenuCollapse);
    };

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        document.body.classList.add("skin-1");
        if (title) {
            document.title = title + " | " + name;
        }

        if (userRole === 3 && admin) {
            history.push("/dashboard");
        }

        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };

        return () => {};
    }, [title, userRole, admin]);

    return (
        <Layout className="ant-layout-private">
            <Sidemenu
                history={history}
                sideMenuCollapse={sideMenuCollapse}
                toggleSideMenuCollapse={toggleSideMenuCollapse}
                userRole={userRole}
                swidth={width}
            />

            <Layout
                className="ant-layout-main"
                style={{
                    marginLeft: !sideMenuCollapse
                        ? width <= 768
                            ? width + "px"
                            : "200px"
                        : "0px",
                }}
            >
                <Header
                    sideMenuCollapse={sideMenuCollapse}
                    toggleSideMenuCollapse={toggleSideMenuCollapse}
                />

                <Layout.Content>{children}</Layout.Content>

                <Footer />
            </Layout>
        </Layout>
    );
};

export default Private;
