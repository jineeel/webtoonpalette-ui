import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';

const ButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
    const { currentSlide } = carouselState;
    return (
        <div className="carousel-button-group mb-4  gap-4 flex justify-between w-full z-10">
            <IconButton onClick={() => previous()} ><NavigateBeforeIcon color='dark' sx={{fontSize:50}}/></IconButton>
            <IconButton onClick={() => next()}><NavigateNextIcon color='dark' sx={{fontSize:50}}/></IconButton>
        </div>
    );
};
export default ButtonGroup;