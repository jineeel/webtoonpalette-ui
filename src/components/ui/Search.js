import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function Search() {
  return (
    <Paper
      component="form"
      sx={{ pl: 1, pr:0.5, display: 'flex', alignItems: 'center', width: 250, height:35, mr:2, mt:1, boxShadow:'rgba(0, 0, 0, 0.1) 0px 1px 5px 0px' , borderRadius:3} }
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize:13}}
        placeholder="검색어를 입력해주세요."
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{}} aria-label="search" >
        <SearchIcon fontSize="small"/>
      </IconButton>
    </Paper>
  );
}