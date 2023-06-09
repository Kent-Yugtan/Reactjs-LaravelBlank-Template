import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, Space } from "antd";
import {
    UserOutlined,
    BookOutlined,
    AppstoreOutlined,
    CalendarOutlined,
    ReconciliationOutlined,
    RobotOutlined,
    MessageOutlined,
    AccountBookOutlined,
    HomeOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import companyInfo from "../../Providers/companyInfo";

const logo = companyInfo().logo;
const name = companyInfo().name;

const Sidemenu = (props) => {
    const {
        history,
        sideMenuCollapse,
        toggleSideMenuCollapse,
        userRole,
        swidth,
    } = props;

    let admin_menu = [
        {
            module_name: "Dashboard",
            url: "/adminDashboard",
            icon: <AppstoreOutlined />,
        },
        {
            module_name: "Users",
            url: "/adminUser",
            icon: <AccountBookOutlined />,
        },
        {
            submenu_name: "References",
            url: "/references",
            icon: <BookOutlined />,
            item_list: [
                {
                    module_name: "Ref Mode Of Payment",
                    title: "Mode Of Payment",
                    url: "/references/payment-mode",
                },
                //   {
                //       module_name: "Ref User Role",
                //       title: "User Role",
                //       url: "/references/user-role",
                //   },
            ],
        },
    ];

    let client_menu = [];

    const menu_items = userRole !== 3 ? admin_menu : client_menu;

    let pathname = history.location.pathname;
    pathname = pathname.split("/");
    pathname = "/" + pathname[1];

    const defaultValueOpenKeys = menu_items
        .filter((item) => item.url === pathname)
        .map((item) => item.url);
    const [openKeys, setOpenKeys] = useState(defaultValueOpenKeys);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        const menuItemsFilter = menu_items
            .filter((item) => item.url === latestOpenKey)
            .map((item) => item.url);

        if (menuItemsFilter.indexOf(latestOpenKey) === -1) {
            setOpenKeys(menuItemsFilter);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const activeRoute = (routeName) => {
        const pathname = history.location.pathname.split("/");
        return "/" + pathname[1] === routeName ? "ant-menu-item-selected " : "";
    };

    const activeSubRoute = (routeName) => {
        const pathname = history.location.pathname.split("/");
        return "/" + pathname[1] + "/" + pathname[2] === routeName
            ? "ant-menu-item-selected"
            : "";
    };

    const handleMenuRender = () => {
        return menu_items.map((item, index) => {
            if (item.submenu_name) {
                let submenu_item_list_count = 0;

                let submenu_item_list = item.item_list.map((item2, index2) => {
                    submenu_item_list_count++;

                    return (
                        <Menu.Item
                            key={item2.url}
                            className={activeSubRoute(item2.url)}
                        >
                            <Link to={item2.url}>
                                {item2.title ?? item2.module_name}
                            </Link>
                        </Menu.Item>
                    );
                });

                if (submenu_item_list_count !== 0) {
                    return (
                        <Menu.SubMenu
                            key={item.url}
                            icon={item.icon}
                            title={item.submenu_name}
                        >
                            {submenu_item_list}
                        </Menu.SubMenu>
                    );
                }
            } else {
                return (
                    <Menu.Item
                        key={item.url}
                        className={activeRoute(item.url)}
                        icon={item.icon}
                    >
                        <Link
                            onClick={() => {
                                setOpenKeys([]);
                            }}
                            to={item.url}
                        >
                            {item.title ?? item.module_name}
                        </Link>
                    </Menu.Item>
                );
            }

            return "";
        });
    };

    // console.log("width", swidth);

    return (
        <Layout.Sider
            trigger={null}
            collapsible
            collapsed={sideMenuCollapse}
            collapsedWidth="0"
            breakpoint="lg"
            width={swidth <= 768 ? swidth : 200}
        >
            <div className="nav-header">
                <Space direction="horizontal">
                    {/* <img src={logo} alt={name} /> */}
                    {swidth <= 768 ? (
                        <Button
                            icon={<MenuUnfoldOutlined />}
                            onClick={toggleSideMenuCollapse}
                        />
                    ) : (
                        ""
                    )}
                </Space>
            </div>
            <div className="ant-sider-list-container">
                <Menu
                    theme="dark"
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                >
                    {handleMenuRender()}
                </Menu>
            </div>
        </Layout.Sider>
    );
};

export default Sidemenu;
