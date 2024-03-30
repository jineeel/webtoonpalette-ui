import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { Container } from '@mui/material';
import LoginComponent from '../../components/member/LoginComponent';

function LoginPage(props) {
    
    return (
        <div className='mt-20'>
            <LoginComponent />
        </div>
    );
}

export default LoginPage;