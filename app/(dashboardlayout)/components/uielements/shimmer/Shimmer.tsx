import React from 'react';
import style from './shimmer.module.css'
import { ShimmerThumbnail } from 'react-shimmer-effects';

const Shimmer = () => {
    return (
        <>
            <div className={style.shimmer_overley}>
                <ShimmerThumbnail height={160}
                />


                <div className={style.shimmer}>

                    <div className={style.shimmer_label_flex}>
                        <ShimmerThumbnail height={20} width={180} className={style.shimmertitle} />
                        <ShimmerThumbnail height={20} width={180} className={style.shimmertitle} />
                        <ShimmerThumbnail height={20} width={180} className={style.shimmertitle}
                        />
                    </div>
                    <div className={style.shimmer_icon_flex}>
                        <ShimmerThumbnail height={50} width={50} className={style.shimmertitle} />
                        <ShimmerThumbnail height={50} width={50} className={style.shimmertitle} />
                        <ShimmerThumbnail height={50} width={50} className={style.shimmertitle} />
                    </div>

                </div>
            </div>



        </>
    );
};

export default Shimmer;
