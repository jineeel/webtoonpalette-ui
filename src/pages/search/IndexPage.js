import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';

const IndexPage = () => {
    return (
        <BasicLayout>
            <Container fixed>
                <div className="flex flex-col items-center">
                    <Typography variant="h6" sx={{mt:2, mb:1}}>검색</Typography>
                </div>
                <Outlet />
            </Container>
        </BasicLayout>
    );
}

export default IndexPage;
