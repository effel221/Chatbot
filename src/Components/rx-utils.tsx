import {interval, merge, Observable} from "rxjs";
import {TweetSettings} from "./Interfaces";
import {map} from "rxjs/operators";

const createTweetSource = (frequency: number, account: string, attribute: string): Observable<TweetSettings> => {
    return interval(frequency).pipe(map(i => ({
        account,
        timestamp: Date.now(),
        content: `${attribute} Tweet number ${i + 1}`
    })));
}
export const tweets = merge(
    createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
    createTweetSource(3000, 'iamdevloper', 'Expert'),
    createTweetSource(5000, 'CommitStrip', 'Funny')
);
