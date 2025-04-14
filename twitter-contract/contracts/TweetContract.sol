// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract TweetContract {
    struct Tweet {
        string id;
        string content; 
        uint createdAt;  
        address createdBy; 
        uint likesCount;
        uint commentsCount;
    }

    struct UserStats {
        uint totalLikesReceived;
        uint totalCommentsReceived;
    }

    mapping(address => Tweet[]) public userTweets;
    mapping(string => Tweet[]) public comments;
    mapping(string => address[]) public likes;
    mapping(string => Tweet) public tweets;
    mapping(address => UserStats) public userStats;

    Tweet[] public allTweets;

    constructor() {
        console.log("Twitter contract deployed by:", msg.sender);
    }

    function postTweet(string memory _id, string memory _content) public returns (Tweet memory) {
        Tweet memory newTweet = Tweet({
            id: _id,
            content: _content,
            createdAt: block.timestamp,
            createdBy: msg.sender,
            likesCount: 0,
            commentsCount: 0
        });

        userTweets[msg.sender].push(newTweet);
        tweets[_id] = newTweet;
        allTweets.push(newTweet);

        return newTweet;
    }

    function likeTweet(string memory _tweetId) public {
        require(bytes(tweets[_tweetId].id).length > 0, "Tweet does not exist");
        require(bytes(_tweetId).length > 0, "Invalid tweet ID");

        Tweet storage tweet = tweets[_tweetId];

        bool hasLiked = false;
        uint likeIndex;

        for (uint i = 0; i < likes[_tweetId].length; i++) {
            if (likes[_tweetId][i] == msg.sender) {
                hasLiked = true;
                likeIndex = i;
                break;
            }
        }

        if (hasLiked) {
            likes[_tweetId][likeIndex] = likes[_tweetId][likes[_tweetId].length - 1];
            likes[_tweetId].pop();
            tweet.likesCount--;

            // Update user stats
            userStats[tweet.createdBy].totalLikesReceived--;
        } else {
            likes[_tweetId].push(msg.sender);
            tweet.likesCount++;

            // Update user stats
            userStats[tweet.createdBy].totalLikesReceived++;
        }
    }

    function postComment(string memory _tweetId, string memory _id, string memory _content) public returns (Tweet memory) {
        require(bytes(tweets[_tweetId].id).length > 0, "Tweet does not exist");
        require(bytes(_tweetId).length > 0, "Invalid tweet ID");

        Tweet memory newComment = Tweet({
            id: _id,
            content: _content,
            createdAt: block.timestamp,
            createdBy: msg.sender,
            likesCount: 0,
            commentsCount: 0
        });

        allTweets.push(newComment);
        tweets[_id] = newComment;
        comments[_tweetId].push(newComment);
        tweets[_tweetId].commentsCount++;

        // Update user stats
        userStats[tweets[_tweetId].createdBy].totalCommentsReceived++;

        return newComment;
    }

    function getUserTweets(address _userAddress) public view returns (Tweet[] memory) {
        require(_userAddress != address(0), "Invalid user address");
        return userTweets[_userAddress];
    }

    function getTweetById(string memory _tweetId) public view returns (Tweet memory) {
        require(bytes(tweets[_tweetId].id).length > 0, "Tweet does not exist");
        require(bytes(_tweetId).length > 0, "Invalid tweet ID");
        return tweets[_tweetId];
    }

    function getComments(string memory _tweetId) public view returns (Tweet[] memory) {
        require(bytes(tweets[_tweetId].id).length > 0, "Tweet does not exist");
        require(bytes(_tweetId).length > 0, "Invalid tweet ID");
        return comments[_tweetId];
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        return allTweets;
    }

    function getLikes(string memory _tweetId) public view returns (address[] memory) {
        require(bytes(tweets[_tweetId].id).length > 0, "Tweet does not exist");
        require(bytes(_tweetId).length > 0, "Invalid tweet ID");
        return likes[_tweetId];
    }

    function getUserStats(address _userAddress) public view returns (UserStats memory) {
        return userStats[_userAddress];
    }
}
