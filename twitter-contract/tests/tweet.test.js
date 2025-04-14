/* eslint-disable no-undef */
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TweetContract", function () {
  let TweetContract;
  let tweetContract;

  beforeEach(async () => {
    TweetContract = await ethers.getContractFactory("TweetContract");
    tweetContract = await TweetContract.deploy();
    await tweetContract.deployed();
  });

  it("should post a tweet and retrieve it", async function () {
    await tweetContract.postTweet("1", "This is my first tweet");
    const tweet = await tweetContract.getTweetById("1");
    
    expect(tweet.content).to.equal("This is my first tweet");
    expect(tweet.createdBy).to.equal(await ethers.provider.getSigner().getAddress());
  });

  it("should like a tweet", async function () {
    await tweetContract.postTweet("2", "Another tweet to like");
    await tweetContract.likeTweet("2");
    const tweet = await tweetContract.getTweetById("2");

    expect(tweet.likesCount).to.equal(1);
  });

  it("should post comments and retrieve them", async function () {
    await tweetContract.postTweet("3", "Tweet with comments");
    await tweetContract.postComment("3", "First comment");
    await tweetContract.postComment("3", "Second comment");

    const comments = await tweetContract.getComments("3");

    expect(comments.length).to.equal(2);
  });

  it("should get all tweets", async function () {
    await tweetContract.postTweet("4", "Tweet 4");
    await tweetContract.postTweet("5", "Tweet 5");

    const allTweets = await tweetContract.getAllTweets();

    expect(allTweets.length).to.equal(2);
  });

  it("should get likes for a tweet with valid ID", async function () {
    await tweetContract.postTweet("6", "Tweet with likes");
    await tweetContract.likeTweet("6");

    const likes = await tweetContract.getLikes("6");

    expect(likes.length).to.equal(1);
    expect(likes[0]).to.equal(await ethers.provider.getSigner().getAddress());
  });

  it("should get comments for a tweet with valid ID", async function () {
    await tweetContract.postTweet("7", "Tweet with comments");
    await tweetContract.postComment("7", "First comment");

    const comments = await tweetContract.getComments("7");

    expect(comments.length).to.equal(1);
    expect(comments[0].content).to.equal("First comment");
  });

  it("should revert when getting tweet with invalid ID", async function () {
    await expect(tweetContract.getTweetById("invalidId")).to.be.revertedWith("Tweet does not exist");
  });

  it("should revert when liking tweet with invalid ID", async function () {
    await expect(tweetContract.likeTweet("invalidId")).to.be.revertedWith("Tweet does not exist");
  });

  it("should revert when posting comment on tweet with invalid ID", async function () {
    await expect(tweetContract.postComment("invalidId", "c1", "Invalid comment")).to.be.revertedWith("Tweet does not exist");
  });

  it("should revert when getting comments for tweet with invalid ID", async function () {
    await expect(tweetContract.getComments("invalidId")).to.be.revertedWith("Tweet does not exist");
  });
});
