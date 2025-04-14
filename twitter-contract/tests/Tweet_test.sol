// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "remix_tests.sol";
import "../contracts/TweetContract.sol"; // Adjust the import path based on your project structure

contract TweetContractTest {

    TweetContract tweetContract;

    function beforeAll() public {
        tweetContract = new TweetContract();
    }

    function testPostTweet() public {
        tweetContract.postTweet("1", "This is my first tweet");
        TweetContract.Tweet memory tweet = tweetContract.getTweetById("1");

        Assert.equal(tweet.content, "This is my first tweet", "Tweet content doesn't match");
        Assert.equal(tweet.createdBy, address(this), "Tweet created by doesn't match");
    }

    function testLikeTweet() public {
        tweetContract.postTweet("2", "Another tweet to like");
        tweetContract.likeTweet("2");
        TweetContract.Tweet memory tweet = tweetContract.getTweetById("2");

        Assert.equal(tweet.likesCount, 1, "Like count should be 1");
    }

    function testPostComment() public {
        tweetContract.postTweet("3", "Tweet with comments");
        tweetContract.postComment("3", "c1", "First comment");
        tweetContract.postComment("3", "c2", "Second comment");

        TweetContract.Tweet[] memory comments = tweetContract.getComments("3");

        Assert.equal(comments.length, 2, "Number of comments should be 2");

        Assert.equal(comments[0].id, "c1", "Comment ID does not match.");
        Assert.equal(comments[0].content, "First comment", "Comment content does not match.");

        Assert.equal(comments[1].id, "c2", "Comment ID does not match.");
        Assert.equal(comments[1].content, "Second comment", "Comment content does not match.");
    }

    function testGetAllTweets() public {
        tweetContract.postTweet("4", "Tweet 4");
        tweetContract.postTweet("5", "Tweet 5");

        TweetContract.Tweet[] memory allTweets = tweetContract.getAllTweets();

        Assert.equal(allTweets.length, 5, "Number of tweets should be 5");
    }

    function testInvalidTweetId() public {
        // Trying to get a tweet with an invalid ID should revert
        (bool success, ) = address(tweetContract).call(abi.encodeWithSignature("getTweetById(string)", "invalidId"));
        Assert.equal(success, false, "Getting tweet with invalid ID should revert");
    }

    function testLikeInvalidTweet() public {
        // Trying to like a tweet with an invalid ID should revert
        (bool success, ) = address(tweetContract).call(abi.encodeWithSignature("likeTweet(string)", "invalidId"));
        Assert.equal(success, false, "Liking tweet with invalid ID should revert");
    }

    function testPostCommentInvalidTweet() public {
        // Trying to post a comment on a tweet with an invalid ID should revert
        (bool success, ) = address(tweetContract).call(abi.encodeWithSignature("postComment(string,string,string)", "invalidId", "c3", "Invalid comment"));
        Assert.equal(success, false, "Posting comment on invalid tweet should revert");
    }

    function testGetCommentsInvalidTweet() public {
        // Trying to get comments for a tweet with an invalid ID should revert
        (bool success, ) = address(tweetContract).call(abi.encodeWithSignature("getComments(string)", "invalidId"));
        Assert.equal(success, false, "Getting comments for invalid tweet should revert");
    }
}
