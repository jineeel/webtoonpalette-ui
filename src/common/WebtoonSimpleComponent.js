import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { convertGenre, convertFanCount } from './convertValue';
import naver from '../images/naver_webtoon.png';
import kakao from '../images/kakao_webtoon.png';
import adult from '../images/adult_icon.png';
import rest from '../images/rest.png';
import finished from '../images/finished.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useCustomMove from '../hooks/useCustomMove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { deleteFavorite } from '../api/favoriteApi';

function SimpleListComponent(props) {
    const {moveToDetail, page} = useCustomMove();

    const handleClickFavorite = (e) => {
      console.log(e.currentTarget.value)

      deleteFavorite(e.currentTarget.value).then(data => {
        props.changeFavoriteState()
      })
    }

    return (
        <Grid container spacing={{ xs: 2 }}>
          {props.serverData.dtoList.map((webtoon,index) => (

          <Grid item xs={6} key={webtoon.id}>

            <div className="flex flex-row justify-between border border-gray-100 p-2 rounded-lg shadow">
              <div className="flex flex-row w-full" onClick={()=> moveToDetail(webtoon.id, webtoon.genre, page)} >
              <div className="relative z-0 ">
                <img    
                  srcSet={`${webtoon.img}`}
                  src={`${webtoon.img}`}
                  alt={webtoon.title}
                  loading="lazy"
                  className='w-20 h-20 rounded-lg object-cover shadow-lg'
                />

                <div className='w-5 absolute z-10 m-1 bottom-0 right-0'>
                  {webtoon.adult == 'Y' ? <img src={adult} alt="adult"/> : <></>}
                </div>
                <div className='w-5 absolute z-10 top-0 left-1'>
                  {webtoon.updateDay == 'finished' && webtoon.rest == 'N' ?  <img src={finished} alt="fin"/> : <></>}
                  {webtoon.rest == 'Y' ?  <img src={rest} alt="rest"/> : <></>}
                </div>
              </div>
             
                <div className='flex flex-col justify-between ml-4'>
                  <div className='flex'>
                    {webtoon.platform == 'naver' ? <img src={naver} alt="naver" className='size-5 mt-1 mr-1'/> : <img src={kakao} alt="kakao" className='size-5 mt-1 mr-1'/>}
                    <span className='font-semibold'>{webtoon.title}</span>
                  </div>
                  <div className='text-xs text-black mb-1'>
                      <span className="mr-1">{convertGenre(webtoon.genre)} ·</span>
                      <span>{webtoon.author}</span>
                  </div>
                  <div className='text-xs'>
                    {webtoon.fanCount != 0 ? <span className='mr-1'><VisibilityIcon fontSize="small" color="disabled" sx={{mr:0.5}}/>{convertFanCount(webtoon.fanCount)}</span> : <></>}
                  </div>
                </div>
                </div>
                <div>
                  <IconButton  sx={{ ml:1, justifyContent:'end'}} color="red" id="like" value={webtoon.favoriteId} onClick={handleClickFavorite}>
                      <FavoriteIcon color="red" fontSize='small' sx={{opacity:'80%'}}/>
                  </IconButton>
                </div>
              </div>
                
          </Grid>
          ))}   
      </Grid>
    );
}

export default SimpleListComponent;