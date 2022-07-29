import React from 'react';
import HeaderHome from './HeaderHome';
import BottomBodyAdm from '../BottomBodyAdm';
import HomeProfit   from "./HomeProfit";
const HomeAdmin = () => {
    return (
        <div>
            <HeaderHome></HeaderHome>
            <BottomBodyAdm>
                <HomeProfit></HomeProfit>
            </BottomBodyAdm>
        </div>
    );
};

export default HomeAdmin;