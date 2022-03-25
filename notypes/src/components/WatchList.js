import React from 'react';

const WatchList = ({posterPath,title,tmbdId,score,children }) => {
    
    return (
        <div >
            <img src={`https://image.tmdb.org/t/p/original/${posterPath}`}  alt={title} />
            <div >
                <h5> {title}</h5>
                {   <>
                        <p>{score}</p>
                                       
                    </>
                }

                
                {children}
            </div>
        </div>
    )
};

export default WatchList;