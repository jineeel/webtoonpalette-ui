import * as React from 'react';
import { Suspense, lazy } from "react";
import webtoonRouter from "./webtoonRouter";
import memberRouter from './memberRouter';

const { createBrowserRouter } = require("react-router-dom");

const Main = lazy(()=>import("../pages/webtoon/MainPage"))
// const Today = lazy(()=>import("../pages/TodayPage"))
// const Genre = lazy(()=>import("../pages/GenrePage"))
// const Platform = lazy(()=>import("../pages/PlatformPage"))
// const Rank = lazy(()=>import("../pages/RankPage"))

const WebtoonIndex = lazy(()=>import("../pages/webtoon/IndexPage"))

const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense><WebtoonIndex /></Suspense>,
        children: webtoonRouter()
    },
    {
        path: 'member',
        children: memberRouter()
    },
])

export default root;