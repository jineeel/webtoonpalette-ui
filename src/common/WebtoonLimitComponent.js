import React, { useEffect, useState } from 'react';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import PaletteIcon from '@mui/icons-material/Palette';
import { useSelector } from 'react-redux';
import useCustomLogin from '../hooks/useCustomLogin';
import { postFavorite, deleteFavorite } from '../api/favoriteApi';
import LoginModalComponent from './LoginModalComponent';
import { truncate } from './convertValue';

function WebtoonLimitComponent(props) {
    const { isLogin } = useCustomLogin()
    const [modalLogin, setModalLogin] = useState(false)
    const [openToggle, setOpenToggle] = useState(false)
    const {moveToDetail, page} = useCustomMove();
    const memberInfo = useSelector(state => state.memberSlice)
    const memberId = memberInfo.id
    const [favoriteIds, setFavoriteIds ] = useState();

    const handleClickFavorite = (webtoonId, favoriteId) =>  {
      if(!isLogin){

          setModalLogin(true)
          setOpenToggle(!openToggle)

      }else{

          if(favoriteId>0 || favoriteId != null){
              // 이미 눌렀으면 좋아요 취소
              deleteFavorite(favoriteId).then(data=>{
                  setFavoriteIds(null)
                  props.changeFavoriteState()
              })

          }else{ 

              postFavorite({memberId, webtoonId}).then(data => { 
                  setFavoriteIds(data.id)
                 props.changeFavoriteState()
              })
          }
      }  
  }
    return (
        <Grid container spacing={{ xs: 2 }}>
          {modalLogin? <LoginModalComponent openToggle={openToggle} /> : <></> }
          {props.serverData.dtoList.slice(0,6).map((webtoon,index) => (
          <Grid item xs={2} key={webtoon.id}>
            <div onClick={()=> moveToDetail(webtoon.id, webtoon.genre, page)} >
              <div className="flex relative z-0 rounded-lg shadow w-44 h-48 overflow-hidden">
                <img    
                  srcSet={`${webtoon.img}`}
                  src={`${webtoon.img}`}
                  alt={webtoon.title}
                  loading="lazy"
                  className='w-full h-full rounded-lg object-cover lg:hover:scale-105 transition-transform ease-in-out duration-800'
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
                    <span className='font-semibold'>{truncate(webtoon.title,22)}</span>
                  </div>
                  <div className='text-xs text-black mb-1'>
                      <span className="mr-1">{convertGenre(webtoon.genre)} ·</span>
                      <span>{truncate(webtoon.author,9)}</span>
                  </div>
                  <div className='flex flex-row justify-between text-xs items-center'>
                  <span className='mr-1'><VisibilityIcon fontSize="small" color="disabled" sx={{mr:0.5}}/> {webtoon.fanCount != 0 ? convertFanCount(webtoon.fanCount) : '-'}</span>
                    <div className='right-0'>
                      <IconButton
                        value={webtoon.favoriteId} 
                        sx={{m:-1}}
                        onClick={(e)=> {
                            e.stopPropagation();
                            handleClickFavorite(webtoon.id, webtoon.favoriteId);
                        }}>
                          <FavoriteIcon color={webtoon.favoriteId == null || webtoon.favoriteId <= 0 ? 'inherit' : "red"} 
                          sx={webtoon.favoriteId == null || webtoon.favoriteId <= 0? {opacity:'50%', fontSize:18}: {fontSize:18}} 
                          value={webtoon.favoriteId}
                          />
                      </IconButton>
                      <IconButton sx={{mt:-1, mb:-1, ml:0.1 }}>
                        <PaletteIcon color='inherit' fontSize='small' sx={{opacity:'50%',  fontSize:18}}/>
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
              
          </Grid>
          ))}   
      </Grid>
    );
}



export default WebtoonLimitComponent;