import React from 'react';
import { Container } from '@mui/material';
import MainComponent from '../../components/webtoon/MainComponent';



function MainPage(props){
    return (
        <Container maxWidth="xl">
            <MainComponent />
        </Container>
    );

}
export default MainPage;