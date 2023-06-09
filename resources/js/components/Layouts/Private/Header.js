import { createElement, Fragment } from "react";
// import { useHistory } from "react-router-dom";
import { Badge, Dropdown, Layout, Menu, Space, Typography } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    BellOutlined,
} from "@ant-design/icons";
import companyInfo from "../../Providers/companyInfo";
const userData = companyInfo().userData;
const userImage = companyInfo().userImage;

const Header = (props) => {
    const {
        sideMenuCollapse,
        toggleSideMenuCollapse,
        dataNotifications,
        handleClickNotif,
    } = props;

    let countCataNotifications =
        dataNotifications &&
        dataNotifications.filter((item) => item.is_read === 0);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    };

    const handleRenderNotificationItem = () => {
        return (
            <Menu
                style={{
                    width: 230,
                    maxHeight: "200px",
                    overflow: "hidden auto",
                }}
            >
                {dataNotifications && dataNotifications.length !== 0 ? (
                    dataNotifications.map((item, index) => {
                        let dataNotificationsLength =
                            dataNotifications && dataNotifications.length - 1;

                        return (
                            <Fragment key={`notificaiton_key_${index}`}>
                                <Menu.Item
                                    key={`notificaiton_key_${index}`}
                                    onClick={() => handleClickNotif(item)}
                                >
                                    <Typography.Text
                                        strong
                                        className="ant-notif-title"
                                    >
                                        {item.title}
                                    </Typography.Text>
                                    <br />
                                    <Typography.Text className="ant-notif-description">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: item.description,
                                            }}
                                        />
                                    </Typography.Text>
                                </Menu.Item>
                                {dataNotificationsLength !== index && (
                                    <Menu.Divider
                                        key={`notificaiton_key_${index}_${
                                            index + 1
                                        }`}
                                    />
                                )}
                            </Fragment>
                        );
                    })
                ) : (
                    <Menu.Item key={`notificaiton_key_0`}>
                        <Typography.Text strong className="text-center">
                            No notications
                        </Typography.Text>
                    </Menu.Item>
                )}
            </Menu>
        );
    };

    return (
        <Layout.Header>
            {createElement(
                sideMenuCollapse ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                    className: "ant-trigger float-left",
                    onClick: toggleSideMenuCollapse,
                }
            )}

            <Space
                className="float-right"
                placement="bottomCenter"
                style={{ position: "absolute", right: "15px", height: "45px" }}
            >
                <Dropdown
                    overlay={handleRenderNotificationItem}
                    placement="bottomLeft"
                    overlayClassName="ant-dropdown-notif"
                    // open={true}
                >
                    <Badge
                        count={
                            countCataNotifications &&
                            countCataNotifications.length
                        }
                    >
                        <BellOutlined />
                    </Badge>
                </Dropdown>

                {/* <div>
                    <img
                        src={userImage}
                        alt="userImage"
                        style={{ width: 35, borderRadius: "50%" }}
                    />{" "}
                    {userData.name}
                </div> */}

                <a href="/" onClick={handleLogout}>
                    <LogoutOutlined /> Log out
                </a>
            </Space>
        </Layout.Header>
    );
};

export default Header;
