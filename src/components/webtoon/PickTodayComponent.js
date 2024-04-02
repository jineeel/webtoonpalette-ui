import { Typography, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getList } from '../../api/webtoonApi';
import { todayOfWeek } from '../../common/convertValue';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useCustomMove from '../../hooks/useCustomMove';
import CarouselButtonGroup from './../../common/CarouselButtonGroup';
import { convertDay, truncate } from '../../common/convertValue';
import naver from '../../images/naver_webtoon.png';
import kakao from '../../images/kakao_webtoon.png';
import adult from '../../images/adult_icon.png';
const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 
}

function PickTodayComponent(props) {
    const {moveToDetail} = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    const updateDay = todayOfWeek();
    const size = 30;

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
      

    useEffect(() => {
        getList({size,updateDay}).then(data =>{

            setServerData(data)
        })
        
    },[updateDay])
    
    return (
        <div className='relative'> 
          <Container maxWidth='xl' sx={{width:'100%', mt:3}}>
       
          <span className="font-medium text-neutral-800 text-xl">UP! {convertDay(updateDay)}의 웹툰 🌟</span>
            <Carousel  responsive={responsive}
                        autoPlaySpeed={2500}
                        autoPlay={true}
                        partialVisible={false}
                        renderButtonGroupOutside={true} 
                        customButtonGroup={<CarouselButtonGroup />}
                        arrows={false}
            >
              {serverData.dtoList.map((webtoon,index) => (
                <div key={webtoon.id} onClick={()=> moveToDetail(webtoon.id, webtoon.genre)} className='ml-1 mr-1 mb-10 mt-4 relative rounded-md'> 
                <div className="flex relative z-0">
                  <img    
                    srcSet={`${webtoon.img}`}
                    src={`${webtoon.img}`}
                    alt={webtoon.title}
                    loading="lazy"
                    className='w-full h-72 object-cover rounded-lg border shadow border-gray-200'
                  />
                
                {/* adult, rest  */}
                  <div className='w-6 absolute z-10 m-1 top-1 right-1'>
                    {webtoon.adult == 'Y' ? <img src={adult} alt="adult"/> : <></>}
                  </div>
                </div>
              
                  <div className='mb-1 w-full relative'>
                    <div className='flex my-1'>
                      {webtoon.platform == 'naver' ? <img src={naver} alt="naver" className='size-5 mt-1 mr-1'/> : <img src={kakao} alt="kakao" className='size-5 mt-1 mr-1'/>}
                      <span className='font-semibold'>{truncate(webtoon.title,25)}</span>
                    </div>
                    <div className='text-xs text-black'>
                        <span>{webtoon.author}</span>
                    </div>
                  </div>
              </div>
              ))}   
          </Carousel>
      
        </Container>
        </div>
    );
}

export default PickTodayComponent;