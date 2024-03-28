import React from 'react';
import WebtoonComponent from '../../components/search/WebtoonComponent';
import { Container } from '@mui/material';

function WebtoonPage(props) {
    return (
        <Container fixed>
            <WebtoonComponent /> 
        </Container>
    );
}

export default WebtoonPage;