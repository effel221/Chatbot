import React, {useState, useEffect} from 'react';
import {interval, merge, Observable} from "rxjs";
import {map} from "rxjs/operators";
import moment from 'moment';

import './App.scss'
import Loader from "./Loader";

interface TweetSettings {
    account: string,
    timestamp: number,
    content: string,
    liked?: boolean
};

const createTweetSource = (frequency: number, account: string, attribute: string): Observable<TweetSettings> => {
    return interval(frequency).pipe(map(i => ({
        account,
        timestamp: Date.now(),
        content: `${attribute} Tweet number ${i + 1}`
    })));
}
const tweets = merge(
    createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
    createTweetSource(3000, 'iamdevloper', 'Expert'),
    createTweetSource(5000, 'CommitStrip', 'Funny')
);

const App = () => {
    const [loadingState, setloadingState] = useState(false);
    const [tweetsArr, setTweetsArr] = useState([]);
    const [likedState, setLikedState] = useState(false);
    const [likeditemsAmount, setLikeditemsAmount] = useState(0);

    useEffect(() => {
        setloadingState(true);
        const tweetsSub = tweets.subscribe(tweetItem => {
            setTweetsArr((tweetsArr:TweetSettings[])=>{
                const newTweetsArr = [{...tweetItem, liked: false}, ...tweetsArr];
                return newTweetsArr;
            });
            setloadingState(false);
        });
        return () => tweetsSub.unsubscribe();
    }, []);

    const clearAllTweets = () => {
        setTweetsArr([]);
        setLikeditemsAmount(0);
        setLikedState(false);
    };

    const showHideLikedStatus = (timestamp: string, account: string) => {
       const currentitemIndex = tweetsArr.findIndex((elem) => {
           return elem.account === account && elem.timestamp === timestamp
       })
       const isItemLiked = tweetsArr[currentitemIndex].liked;
       tweetsArr[currentitemIndex].liked = !isItemLiked;
       const likedArr = tweetsArr.filter((item) => item.liked===true)
       setLikeditemsAmount(likedArr.length);
       setTweetsArr([...tweetsArr]);
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
                    <button className={likedState ? "active" : "" } onClick={showLikedTweets}>
                        Liked Tweets
                    </button>
                    <button className={!likedState ? "active" : "" } onClick={showAllTweets}>
                        All Tweets
                    </button>
                    <button className="reset" onClick={clearAllTweets}>
                        Clear All Tweets
                    </button>
                    <span className="total-fav">Liked tweets: {likeditemsAmount}</span>
                </div>
                {!loadingState && tweetsArr && tweetsArr.map((item, index) => {
                    const headerClass = item.liked ? "liked" : "";
                    const addLikeButtonClass = item.liked ? "add-like fas fa-heart liked" : "add-like far fa-heart";
                    if (likedState && !item.liked) return null;
                    return <div className="tweet-wrapper" key={item.timestamp}>
                        <h4 className={headerClass}>{item.account}</h4>
                        <article>
                            <div className='date'>{moment(item.timestamp).format('DD MM YYYY hh:mm:ss')}</div>
                            <p>{item.content}</p>
                            <button className={addLikeButtonClass} onClick={() => showHideLikedStatus(item.timestamp, item.account)}>
                                Like
                            </button>
                        </article>
                    </div>
                })}
                {loadingState && <Loader/>}
            </section>
        </>
    );
};

export default App;
