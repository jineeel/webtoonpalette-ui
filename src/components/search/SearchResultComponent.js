import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Typography } from '@mui/material';

function SearchResultComponent(props) {
    return (
        <div className='flex flex-col w-full h-40 items-center p-10'>
            <ErrorOutlineIcon fontSize='large' color="primary"/>
            <Typography variant='h6' sx={{m:2}} >검색 결과가 없습니다.</Typography>
        </div>
    );
}

export default SearchResultComponent;