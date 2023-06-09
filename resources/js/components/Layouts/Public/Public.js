import { useEffect } from "react";
import companyInfo from "../../Providers/companyInfo";

const name = companyInfo().name ? companyInfo().name : "";

const Public = (props) => {
    const { title, children } = props;

    useEffect(() => {
        if (title) {
            document.title = title + " | " + name;
        }

        return () => {};
    }, [title]);

    return children;
};

export default Public;
