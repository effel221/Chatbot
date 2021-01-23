import React, {useState, useEffect} from 'react';
import {interval, merge} from "rxjs";
import {map} from "rxjs/operators";
import moment from 'moment';

import './App.scss'
import Loader from "./Loader";

const createTweetSource = (frequency: number, account: String, attribute: String) => {
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
    const arr: object[] = [];

    useEffect(() => {
        const tweetsSub = tweets.subscribe(tweetItem => {
            arr.push({...tweetItem});
            setTweetsArr([...arr]);
        });
        return () => tweetsSub.unsubscribe();
    }, []);

    const clearAllTweets = () => {
        setTweetsArr([]);
    };

    return (
        <>
            <header>
                <a href="#" className="logo">My tweets</a>
            </header>
            <section className="main">
                <div className="filter-area">
                    <button onClick={clearAllTweets}>
                        See Favorites
                    </button>
                    <button onClick={clearAllTweets}>
                        All Tweets
                    </button>
                    <button className="reset" onClick={clearAllTweets}>
                        Clear All Tweets
                    </button>
                </div>
                 {tweetsArr.length > 0 && tweetsArr.map((item) => {
                    return <div className="tweet-wrapper" key={item.timestamp}>
                        <h4>{item.account}</h4>
                        <article>
                            <div className='date'>{moment(item.timestamp).format('DD MM YYYY hh:mm:ss')}</div>
                            <p>{item.content}</p>
                                <button className="add-like far fa-heart">
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
