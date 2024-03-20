import React from 'react';
import { useParams  } from 'react-router-dom';
import DetailComponent from '../../components/webtoon/DetailComponent';
import { Container } from '@mui/material';

function DetailPage(props) {
    const {id, genre} = useParams()

    return (
        <Container maxWidth="xl">
            {genre}
            <DetailComponent id={id}/>
        </Container>
    );
}

export default DetailPage;