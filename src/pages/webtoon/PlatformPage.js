import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { Container } from '@mui/material';
import PlatformComponent from '../../components/webtoon/PlatformComponent';

function PlatformPage(props) {
    return (
        <Container pixed="true">
            <PlatformComponent />
        </Container>

    );
}

export default PlatformPage;