import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { Container } from '@mui/material';
import ModifyComponent from '../../components/member/ModifyComponent';

function ModifyPage(props) {
    return (
        <BasicLayout>
            <Container fixed>
                <ModifyComponent />
            </Container>
        </BasicLayout>
    );
}

export default ModifyPage;