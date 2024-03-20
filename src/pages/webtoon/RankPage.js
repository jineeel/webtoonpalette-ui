import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import RankComponent from '../../components/webtoon/RankComponent';
import { Container } from '@mui/material';

function RankPage(props) {
    return (
        <Container pixed="true">
            <RankComponent />
        </Container>

    );
}

export default RankPage;