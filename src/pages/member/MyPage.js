import React from 'react';
import MyPageComponent from '../../components/member/MyPageComponent';
import BasicLayout from '../../layouts/BasicLayout';
import { Container } from '@mui/material';

function MyPage(props) {

    return (
        <div>
            <BasicLayout>
                <Container pixed="true">
                    <MyPageComponent />
                </Container>
            </BasicLayout>
        </div>
    );
}

export default MyPage;