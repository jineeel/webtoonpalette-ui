import React from 'react';
import { useParams, useSearchParams  } from 'react-router-dom';
import DetailComponent from '../../components/webtoon/DetailComponent';
import { Container } from '@mui/material';

function DetailPage(props) {
    const {id} = useParams()
    const [queryParams] = useSearchParams();
    const genre = queryParams.get('genre')

    return (
        <Container maxWidth="xl">
            <DetailComponent id={id} genre={genre}/>
        </Container>
    );
}

export default DetailPage;