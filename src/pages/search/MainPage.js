import { Container } from '@mui/material';
import React from 'react';
import MainComponent from '../../components/search/MainComponent';

function MainPage(props) {
    return (
        <Container fixed>
            <MainComponent /> 
        </Container>
    );
}

export default MainPage;