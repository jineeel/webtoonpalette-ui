import React from 'react';
import Grid from '@mui/material/Grid';
import { convertGenre, convertFanCount } from './convertValue';
import naver from '../images/naver_webtoon.png';
import kakao from '../images/kakao_webtoon.png';
import adult from '../images/adult_icon.png';
import rest from '../images/rest.png';
import finished from '../images/finished.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography } from '@mui/material';
import useCustomMove from '../hooks/useCustomMove';

function WebtoonListComponent(props) {

    const {moveToDetail} = useCustomMove();
    return (
        <Grid container spacing={{ xs: 2 }}>
          {props.serverData.dtoList.map((webtoon,index) => (
          <Grid item xs={2} key={webtoon.id}>
            <div onClick={()=> moveToDetail(webtoon.id, webtoon.genre)}>
              <div className="flex relative z-0">
                <img    
                  srcSet={`${webtoon.img}`}
                  src={`${webtoon.img}`}
                  alt={webtoon.title}
                  loading="lazy"
                  className='w-48 h-48 rounded-lg object-cover shadow-lg'
                />
                <div className='w-6 absolute z-10 m-1 bottom-1 right-0'>
                  {webtoon.adult == 'Y' ? <img src={adult} alt="adult"/> : <></>}
                </div>
                <div className='w-6 absolute z-10 ml-0.5'>
                  {webtoon.updateDay == 'finished' && webtoon.rest == 'N' ?  <img src={finished} alt="fin"/> : <></>}
                  {webtoon.rest == 'Y' ?  <img src={rest} alt="rest"/> : <></>}
                </div>
              </div>
             
                <div className='mb-1 w-44'>
                  <div className='flex my-1 h-16'>
                    {props.rank ? <Typography variant={index > 0 ? "h5" : "h3" } color={index > 0 ? "secondary.dark" : "primary.dark" } sx={{mr:1, mt: -0.4, fontWeight:800}}>{index+1}</Typography> : <></> }
                    {webtoon.platform == 'naver' ? <img src={naver} alt="naver" className='size-5 mt-1 mr-1'/> : <img src={kakao} alt="kakao" className='size-5 mt-1 mr-1'/>}
                    <span className='font-semibold'>{webtoon.title}</span>
                  </div>
                  <div className='text-xs text-black mb-1'>
                      <span className="mr-1">{convertGenre(webtoon.genre)} ·</span>
                      <span>{webtoon.author}</span>
                  </div>
                  <div className='text-xs'>
                    {webtoon.fanCount != 0 ? <span className='mr-1'><VisibilityIcon fontSize="small" color="disabled" sx={{mr:0.5}}/>{convertFanCount(webtoon.fanCount)}</span> : <></>}
                    {/* <span className='mr-1'><FavoriteIcon fontSize="small" color="disabled" sx={{mr:0.5}}/>{convertFanCount(webtoon.fanCount)}</span> */}
                  </div>
                </div>
              </div>
              
          </Grid>
          ))}   
      </Grid>
    );
}



export default WebtoonListComponent;