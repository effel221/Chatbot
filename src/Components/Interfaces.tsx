export interface TweetSettings {
    account: string,
    timestamp: number,
    content: string,
};

export type TweetSettingsAdded = TweetSettings & {liked: boolean};

export interface TweetProps {
    tweetsArr: TweetSettingsAdded[],
    setTweetsArr: (arg0: TweetSettingsAdded[]) => void,
    setLikedItemsAmount: (arg0: number) => void,
    likedState: boolean
};


