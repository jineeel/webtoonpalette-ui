import BasicLayout from "../../layouts/BasicLayout"
import { Outlet} from "react-router-dom";
import { Container } from "@mui/material";
const IndexPage = () => {
    
    return (
        <BasicLayout>
            <Container fixed>
                <Outlet />
            </Container>
        </BasicLayout>
    )
}

export default IndexPage;