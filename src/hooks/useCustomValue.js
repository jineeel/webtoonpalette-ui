import { useState, useEffect } from "react";

const selectList = [
    { value: 'ALL', name: '장르 전체' },
    { value: 'ROMANCE', name: '로맨스' },
    { value: 'FANTASY', name: '판타지' },
    { value: 'ROMANCE_FANTASY', name: '로맨스 판타지' },
    { value: 'ACTION', name: '액션' },
    { value: 'DAILY', name: '일상' },
    { value: 'THRILLER', name: '스릴러' },
    { value: 'COMIC', name: '개그' },
    { value: 'DRAMA', name: '드라마' },
    { value: 'MARTIAL', name: '사극/무협' },
    { value: 'SPORTS', name: '스포츠' },
  ];

const useCustomValue = () => {
    const [fin, setFin] = useState(() => {
        const storedValue = localStorage.getItem('isChecked');
        return storedValue !== null ? JSON.parse(storedValue) : false;
    });
    const tabValue = localStorage.getItem("tabValue");

    const genreSelected = localStorage.getItem("genreSelected") ? localStorage.getItem("genreSelected") : "ALL" ;
    const [genre, setGenre] = useState(genreSelected);
    const [favorite, setFavorite] = useState(false);

    // useEffect(()=>{
    //     setGenre("ALL")
    // },[tabValue])


    const checkFinished = (value) => {
        setFin(fin => !fin);
    }

    const selectGenre = (value) => {
        setGenre(value)
    }

    const changeFavorite = () => {
        console.log("changeFavorite"+favorite)
        setFavorite(!favorite)
    }


    return {fin, genre, checkFinished, selectGenre, changeFavorite, selectList, favorite};
}

export default useCustomValue;