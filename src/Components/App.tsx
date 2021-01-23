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
    const [tweetsArr, setTweetsArr] = useState([]);
    let arr: TweetSettings[] = [];
    const currentTime = Date.now();

    useEffect(() => {
        const tweetsSub = tweets.subscribe(tweetItem => {
            arr.push({...tweetItem, liked: false});
            setTweetsArr([...arr]);
        });
        return () => tweetsSub.unsubscribe();
    }, []);

    const clearAllTweets = () => {
        setTweetsArr([]);
    };

    const showHideLikedStatus = (index: number) => {
       tweetsArr[index].liked = false;
        setTweetsArr(tweetsArr);
    };

    return (
        <>
            <header>
                <a href="#" className="logo">My tweets</a>
            </header>
            <section className="main">
                <div className="filter-area">
                    <button onClick={clearAllTweets}>
                        Liked Tweets
                    </button>
                    <button onClick={clearAllTweets}>
                        All Tweets
                    </button>
                    <button className="reset" onClick={clearAllTweets}>
                        Clear All Tweets
                    </button>
                    <span className="total-fav">Liked tweets: 0</span>
                </div>
                {tweetsArr.length > 0 && tweetsArr.map((item, index) => {
                    const headerClass = item.liked ? "tweet-wrapper liked" : "tweet-wrapper";
                    const addLikeButtonClass = item.liked ? "add-like fas fa-heart liked" : "add-like far fa-heart";
                    return <div className={headerClass} key={item.timestamp}>
                        <h4>{item.account}</h4>
                        <article>
                            <div className='date'>{moment(item.timestamp).format('DD MM YYYY hh:mm:ss')}</div>
                            <p>{item.content}</p>
                            <button className="add-like far fa-heart" onClick={() => showHideLikedStatus(index)}>
                                Like
                            </button>
                        </article>
                    </div>
                })}
                {tweetsArr.length === 0 && <Loader/>}
            </section>
        </>
    );
};

export default App;
