import React from 'react';
import { Container, Typography } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';
import WebtoonCardComponent from './WebtoonCardComponent';

function CarouselComponent(props) {
  
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 767, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
      
    const ButtonGroup = ({ next, previous }) => (
        <div className="carousel-button-group absolute w-full top-0 left-0 flex justify-between z-10 top-2/4">
            <div className='absolute left-0'>
                <IconButton onClick={previous}><NavigateBeforeIcon color='dark' sx={{fontSize:50}}/></IconButton>
            </div>
            <div className='absolute right-0'>
                <IconButton onClick={next}><NavigateNextIcon color='dark' sx={{fontSize:50}}/></IconButton>
            </div>
        </div>
    );
    return (
   
        <div className='relative'>
          <ButtonGroup />
          <Container maxWidth='xl' sx={{width:'90%', borderTop: 1, borderColor: 'grey.100'}}>
            <Typography variant='h5' sx={{fontWeight:600, mt:5, mb:6}}> 이 작품과 비슷한 작품</Typography>
            <Carousel  responsive={responsive}
                        autoPlay={true}
                        // infinite={true}
                        partialVisible={false}
                        renderButtonGroupOutside={true} 
                        customButtonGroup={<ButtonGroup />}
                        arrows={false} 
                        // showDots={false}
            >
              {props.serverData.dtoList.map((webtoon,index) => (
                <WebtoonCardComponent key={index} webtoon={webtoon} />
              ))}   
          </Carousel>
        </Container>
      </div>
    
    );
}

export default CarouselComponent;