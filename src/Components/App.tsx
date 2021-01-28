import React, {useEffect, useState} from 'react';
import {delay} from "rxjs/operators";
import {TweetSettingsAdded} from './Interfaces';
import {tweets} from './rx-utils'
import Loader from "./Loader";
import TweetItems from "./TweetItems";

import './App.scss'


const App = () => {
    const [loadingState, setloadingState] = useState(false);
    const [tweetsArr, setTweetsArr] = useState([]);
    const [likedState, setLikedState] = useState(false);
    const [likedItemsAmount, setLikedItemsAmount] = useState(0);

    useEffect(() => {
        setloadingState(true);
        const tweetsSub = tweets.subscribe(tweetItem => {
            setTweetsArr((tweetsArr: TweetSettingsAdded[]) => {
                return [{...tweetItem, liked: false}, ...tweetsArr];
            });
            setloadingState(false);
        });
        const tweetsDelSub = tweets.pipe(delay(30000)).subscribe(tweetItem => {
            setTweetsArr((tweetsArr: TweetSettingsAdded[]) => {
                return tweetsArr.filter((elem) => !(elem.account === tweetItem.account && elem.content === tweetItem.content));
            });
        });

        return () => {
            tweetsSub.unsubscribe();
            tweetsDelSub.unsubscribe();
        };
    }, []);

    const clearAllTweets = () => {
        setTweetsArr([]);
        setLikedItemsAmount(0);
        setLikedState(false);
    };

    const showLikedTweets = () => {
        setLikedState(true);
    };

    const showAllTweets = () => {
        setLikedState(false);
    };

    return (
        <>
            <header>
                <a href="#" className="logo">My tweets</a>
            </header>
            <section className="main">
                <div className="filter-area">
                    <button className={likedState ? "active" : ""} onClick={showLikedTweets}>
                        Liked Tweets
                    </button>
                    <button className={!likedState ? "active" : ""} onClick={showAllTweets}>
                        All Tweets
                    </button>
                    <button className="reset" onClick={clearAllTweets}>
                        Clear All Tweets
                    </button>
                    <span className="total-fav">Liked tweets: {likedItemsAmount}</span>
                </div>
                {tweetsArr && !loadingState && <TweetItems {...{
                    tweetsArr,
                    likedState,
                    setTweetsArr,
                    setLikedItemsAmount
                }}/>}
                {loadingState && <Loader/>}
            </section>
        </>
    );
};

export default App;
