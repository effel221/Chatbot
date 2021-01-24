import React from "react";
import App  from "../Components/App";
import Loader  from "../Components/Loader";
import TweetItems  from "../Components/TweetItems";

import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


describe("<App />", () => {
  test('Component App should be rendered', () => {
    render(<App />)
  })
});

describe("<Loader />", () => {
  test('Component Loader should be rendered', () => {
    render(<Loader />)
  })
});

describe("<TweetItems />", () => {
  const tweetsArrBase = {
    account: 'AwardsDarwin',
    timestamp: 8753958028903,
    content: 'Facepalm',
  };
  const notLikedTweetItem = [{...tweetsArrBase, liked: false}];
  const likedTweetItem = [{...tweetsArrBase, liked: true}];
  const setTweetsArr = jest.fn();
  const setLikedItemsAmount = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Component TweetItems should be rendered', () => {
    const TweetItemsComp = render(
    <TweetItems
        tweetsArr={notLikedTweetItem}
        likedState={false}
        setTweetsArr={setTweetsArr}
        setLikedItemsAmount={setLikedItemsAmount}
    />);
  });
  test('Component TweetItem should be liked', () => {
    const TweetItemsCompLiked = render(<TweetItems
        tweetsArr={likedTweetItem}
        likedState={true}
        setTweetsArr={setTweetsArr}
        setLikedItemsAmount={setLikedItemsAmount}
    />);
    const likedElemCount = TweetItemsCompLiked.container.getElementsByClassName('liked').length;
    expect(likedElemCount).toBe(2);
  });
});
