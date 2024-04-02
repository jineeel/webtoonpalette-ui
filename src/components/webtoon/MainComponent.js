import React from 'react';
import PickTodayComponent from './PickTodayComponent';
import PickGenreComponent from './PickGenreComponent';
import { useSelector } from 'react-redux';
import { convertGenre } from '../../common/convertValue';

function MainComponent(props) {
    const memberInfo = useSelector(state => state.memberSlice)
    const defaultGenre = ['ROMANCE', 'FANTASY', 'ACTION'];
    const genreList = memberInfo.genreNames != "" ? memberInfo.genreNames : defaultGenre;

    const title = [
        `💘 취향 저격! 가장 핫한 ${convertGenre(genreList[0])} 웹툰만 모아봤어요!`,
        `${memberInfo.nickname != "" ? memberInfo.nickname : "회원"}님께 추천하는 ${convertGenre(genreList[1])} 웹툰 💜`,
        `🙊 한 번 보면 빠질 수 밖에 없는 ${convertGenre(genreList[2])} 웹툰!`
    ]
    return (
        <div>
            <PickTodayComponent />
            {genreList.map((genre,index) => (
                <div key={genre} className="mb-5">
                    <PickGenreComponent genre={genre} title={title[index]}/>
                </div>
            ))}
        </div>
    );
}

export default MainComponent;