import React from 'react';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function CarouselButtonGroup({ next, previous }) {
    return (
        <div className="carousel-button-group absolute w-full top-0 left-0 flex justify-between z-10 top-1/3">
            <div className='absolute left-0'>
                <IconButton onClick={previous} sx={{bgcolor:'white', opacity:'90%'}}><NavigateBeforeIcon sx={{fontSize:50}}/></IconButton>
            </div>
            <div className='absolute right-0'>
                <IconButton onClick={next} sx={{bgcolor:'white', opacity:'90%'}}><NavigateNextIcon sx={{fontSize:50}}/></IconButton>
            </div>
        </div>
    );
}

export default CarouselButtonGroup;