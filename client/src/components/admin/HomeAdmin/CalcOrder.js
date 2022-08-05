import React from 'react';

const CalcOrder = ({title,count,color, icon}) => {
    return (
        <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white rounded shadow-lg xl:mb-0">
            <div className="flex-auto p-4 rounded-2xl">
              <div className="flex flex-wrap">
                <div className="relative flex-1 flex-grow w-full max-w-full pr-4">
                  <h5 className="text-xs font-bold uppercase text-blueGray-400">
                    {title}
                  </h5>
                  <span className="text-xl font-semibold text-blueGray-700">
                    {count}
                  </span>
                </div>
                <div className="relative flex-initial w-auto pl-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-${color}-500 rounded-full shadow-lg`}>
                    
                    {icon}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default CalcOrder;