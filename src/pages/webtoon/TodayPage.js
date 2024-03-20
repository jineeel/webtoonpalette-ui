import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import TodayComponent from '../../components/webtoon/TodayComponent';
import { Container } from '@mui/material';

function TodayPage(props) {
    return (
        <Container pixed="true">
            <TodayComponent />
        </Container>


    );
}

export default TodayPage;