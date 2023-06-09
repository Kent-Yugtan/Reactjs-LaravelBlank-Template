import { Result, Button, Layout, Card } from "antd";
import { useHistory } from "react-router-dom";
import companyInfo from "../../Providers/companyInfo";

const logo = companyInfo().logo;
const name = companyInfo().name;

const NotFound = () => {
    const history = useHistory();

    return (
        <Layout className="login-signup-form animated fadeInDown">
            <Card hoverable bordered={false}>
                <Result
                    status="warning"
                    title="Page Not Found!"
                    extra={
                        <Button
                            type="primary"
                            key="console"
                            onClick={() => history.push("/adminDashboard")}
                        >
                            Please go back to main page.
                        </Button>
                    }
                />
            </Card>
        </Layout>
    );
};

export default NotFound;
