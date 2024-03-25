import React, { useEffect } from 'react';
import naver from '../images/naver_webtoon.png';
import kakao from '../images/kakao_webtoon.png';
import useCustomMove from '../hooks/useCustomMove';
import adult from '../images/adult_icon.png';
import rest from '../images/rest.png';
import finished from '../images/finished.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { convertGenre, convertFanCount } from './convertValue';

function WebtoonCardComponent({webtoon}) {

  
  const {moveToDetail} = useCustomMove()
  
    return (
      <div key={webtoon.id} onClick={()=> moveToDetail(webtoon.id, webtoon.genre)} className='ml-1 mr-1 mb-10 relative rounded-md shadow-xl'> 
        <div className="flex relative z-0 rounded-lg">
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
            <div className='flex my-1 h-16'>
              {webtoon.platform == 'naver' ? <img src={naver} alt="naver" className='size-5 mt-1 mr-1'/> : <img src={kakao} alt="kakao" className='size-5 mt-1 mr-1'/>}
              <span className='font-semibold'>{webtoon.title}</span>
            </div>
            <div className='text-xs text-black mb-1 h-8'>
                <span className="mr-1">{convertGenre(webtoon.genre)} ·</span>
                <span>{webtoon.author}</span>
            </div>
            <div className='text-xs'>
              {webtoon.fanCount != 0 ? <span className='mr-1'><VisibilityIcon fontSize="small" color="disabled" sx={{mr:0.5}}/>{convertFanCount(webtoon.fanCount)}</span> : <></>}
            </div>
          </div>
      </div>
      );
}

export default WebtoonCardComponent;