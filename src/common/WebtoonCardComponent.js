import React from 'react';
import { Container, Typography } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselButtonGroup from './CarouselButtonGroup';
import naver from '../images/naver_webtoon.png';
import kakao from '../images/kakao_webtoon.png';
import useCustomMove from '../hooks/useCustomMove';
import adult from '../images/adult_icon.png';
import rest from '../images/rest.png';
import finished from '../images/finished.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { convertGenre, convertFanCount, truncate } from './convertValue';

function WebtoonCardComponent(props) {
    const {moveToDetail} = useCustomMove()

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
      
    return (
        <div className='relative'>
          <Container maxWidth='xl' sx={{width:'90%'}}>
            <Carousel  responsive={responsive}
                        autoPlay={true}
                        partialVisible={false}
                        renderButtonGroupOutside={true} 
                        customButtonGroup={<CarouselButtonGroup />}
                        arrows={false}
            >
              {props.serverData.dtoList.map((webtoon,index) => (
                <div key={webtoon.id} onClick={()=> moveToDetail(webtoon.id, webtoon.genre)} className='ml-1 mr-1 mb-10 relative rounded-md shadow-xl border border-gray-200'> 
                <div className="flex relative z-0 rounded-lg ">
                  <img    
                    srcSet={`${webtoon.img}`}
                    src={`${webtoon.img}`}
                    alt={webtoon.title}
                    loading="lazy"
                    className='w-full h-60 rounded-lg object-cover shadow-xl'
                  />
        
                  <div className='w-6 absolute z-10 m-1 top-1 right-1'>
                    {webtoon.adult == 'Y' ? <img src={adult} alt="adult"/> : <></>}
                  </div>
                  <div className='w-6 absolute z-10 ml-0.5'>
                    {webtoon.updateDay == 'finished' && webtoon.rest == 'N' ?  <img src={finished} alt="fin"/> : <></>}
                    {webtoon.rest == 'Y' ?  <img src={rest} alt="rest"/> : <></>}
                  </div>
                </div>
              
                  <div className='mb-1 w-full relative rounded-b-lg bg-white -mt-6 p-1'>
                    <div className='flex my-1 h-14'>
                      {webtoon.platform == 'naver' ? <img src={naver} alt="naver" className='size-5 mt-1 mr-1'/> : <img src={kakao} alt="kakao" className='size-5 mt-1 mr-1'/>}
                      <span className='font-semibold'>{truncate(webtoon.title,22)}</span>
                    </div>
                    <div className='text-xs text-black mb-1 h-5'>
                        <span className="mr-1">{convertGenre(webtoon.genre)} ·</span>
                        <span>{truncate(webtoon.author,9)}</span>
                    </div>
                    <div className='text-xs'>
                    <span className='mr-1'><VisibilityIcon fontSize="small" color="disabled" sx={{mr:0.5}}/> {webtoon.fanCount != 0 ? convertFanCount(webtoon.fanCount) : '-'}</span>
                    </div>
                  </div>
              </div>
              ))}   
          </Carousel>
        </Container>
      </div>
    
    );
}

export default WebtoonCardComponent;