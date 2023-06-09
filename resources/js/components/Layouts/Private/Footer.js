import { Layout } from "antd";
import companyInfo from "../../Providers/companyInfo";

const name = companyInfo().name;
const date = companyInfo().date.getFullYear();

const Footer = () => (
    <Layout.Footer style={{ textAlign: "center" }}>
        {name} ©{date} Created by ME
    </Layout.Footer>
);

export default Footer;
