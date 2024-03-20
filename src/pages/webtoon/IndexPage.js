import BasicLayout from "../../layouts/BasicLayout"
import { Outlet, useNavigate } from "react-router-dom";

const IndexPage = () => {
    return (
        <BasicLayout>
            <Outlet />
        </BasicLayout>
    )
}

export default IndexPage;