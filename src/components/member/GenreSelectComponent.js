import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { convertGenre } from '../../common/convertValue';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const genreList = [
    'ROMANCE','FANTASY','ROMANCE_FANTASY','ACTION','DAILY','THRILLER','COMIC','MARTIAL','DRAMA','SPORTS'
]
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  

function GenreSelectComponent(props) {
    const { selectedGenre, onSelectedGenre, genreNames } = props;

    const [localSelectedGenre, setLocalSelectedGenre] = useState([]);

    console.log("genreNames:"+genreNames)
    useEffect(() => {
        if (genreNames && Array.isArray(genreNames)) {
            setLocalSelectedGenre(genreNames.filter(genre => genreList.includes(genre)).slice(0, 3));
        } else {
            setLocalSelectedGenre([]); // genreNames가 정의되지 않은 경우, 빈 배열을 설정
        }
    }, [genreNames]);

    useEffect(()=>{
        onSelectedGenre(localSelectedGenre);
    }, [localSelectedGenre, onSelectedGenre])

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setLocalSelectedGenre(value.slice(0, 3))

    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 350 }}>
                <InputLabel id="demo-multiple-chip-label">장르 선택</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={localSelectedGenre}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={convertGenre(value)} />
                            ))}
                        </Box>
                )}
                MenuProps={MenuProps}
                >
                {genreList.map((genre) => (
                    <MenuItem
                    key={genre}
                    value={genre}
                    >
                    {convertGenre(genre)}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default GenreSelectComponent;