import React from 'react';
import GenreComponent from '../../components/webtoon/GenreComponent';
import { Container } from '@mui/material';

function GenrePage(props) {
    return (
        <Container pixed="true">
            <GenreComponent />
        </Container>

    );
}

export default GenrePage;