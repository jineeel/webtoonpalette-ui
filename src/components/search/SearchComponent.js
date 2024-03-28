import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import useCustomMove from '../../hooks/useCustomMove';

export default function Search(props) {
  const [keyword, setKeyword]= useState()
  const { moveToSearch } = useCustomMove();

  const changeKeyword = (e) => {
      setKeyword(e.target.value)
  }
  const handleClickSearch = () => {
      moveToSearch({keyword:keyword})

  }
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      moveToSearch({keyword:keyword})
    }
  }

  
  return (
    <Paper
      component="form"
      sx={{ pl: 1, pr:0.5, display: 'flex', alignItems: 'center', width:'250', height:35, mr:2, mt:1, boxShadow:'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px' , borderRadius:3} }
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize:13}}
        placeholder="작품, 작가, 팔레트 검색"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={changeKeyword}
        onKeyDown={handleKeyDown}
      />

      <IconButton type="button" sx={{}} aria-label="search" onClick={handleClickSearch} >
        <SearchIcon fontSize="small"/>
      </IconButton>
    </Paper>
  );
}