import React from 'react';
import { interval, merge } from "rxjs";
import { map } from "rxjs/operators";

import './reset.scss'
import './App.scss'

const createTweetSource = (frequency:number, account:String, attribute:String) => {
  return interval(frequency).pipe(map(i => ({
    account,
    timestamp: Date.now(),content: `${attribute} Tweet number ${i + 1}`
  })));
}
const tweets = merge(
    createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
    createTweetSource(3000, 'iamdevloper', 'Expert'),
    createTweetSource(5000, 'CommitStrip', 'Funny')
);
tweets.subscribe(console.log.bind(console));

const App = () => {
  return (
      <h3>Hello World</h3>
  );
};

export default App;
