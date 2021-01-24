import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { TweetSettingsAdded, TweetProps } from './Interfaces';

import './TweetItems.scss'

const TweetItems = ({tweetsArr, likedState, setTweetsArr, setLikedItemsAmount}:TweetProps) => {
    const showHideLikedStatus = (timestamp: number, account: string) => {
        const currentItemIndex = tweetsArr.findIndex((elem:TweetSettingsAdded) => {
            return elem.account === account && elem.timestamp === timestamp
        })
        const isItemLiked = tweetsArr[currentItemIndex].liked;
        tweetsArr[currentItemIndex].liked = !isItemLiked;
        const likedArr = tweetsArr.filter((item) => item.liked === true)
        setLikedItemsAmount(likedArr.length);
        setTweetsArr([...tweetsArr]);
    };

    return (
        <>
            {tweetsArr.map((item) => {
                const headerClass = item.liked ? "liked" : "";
                const addLikeButtonClass = item.liked ? "add-like fas fa-heart liked" : "add-like far fa-heart";
                if (likedState && !item.liked) return null;
                return <div className="tweet-wrapper" key={item.timestamp}>
                    <h4 className={headerClass}>{item.account}</h4>
                    <article>
                        <div className='date'>{moment(item.timestamp).format('DD MM YYYY hh:mm:ss')}</div>
                        <p>{item.content}</p>
                        <button className={addLikeButtonClass}
                                onClick={() => showHideLikedStatus(item.timestamp, item.account)}>
                            Like
                        </button>
                    </article>
                </div>
            })}
        </>
    );
};

export default TweetItems;
