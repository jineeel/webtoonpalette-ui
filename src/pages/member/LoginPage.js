import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { Container } from '@mui/material';
import LoginComponent from '../../components/member/LoginComponent';

function LoginPage(props) {
    
    return (
        <BasicLayout>
            <Container pixed="true" sx={{mt:10}}>
                <LoginComponent />
            </Container>
        </BasicLayout>
    );
}

export default LoginPage;