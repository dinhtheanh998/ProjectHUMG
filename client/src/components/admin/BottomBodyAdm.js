import React from 'react';

const BottomBodyAdm = ({children}) => {
    return (
        <div className="mx-8 max-h-[100vh] overflow-auto ">
            {children}
        </div>
    );
};

export default BottomBodyAdm;