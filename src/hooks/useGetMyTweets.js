import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store => store.tweet);

    // Fetch all tweets of the logged-in user
    const fetchMyTweets = useCallback(async () => {
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
                withCredentials: true
            });
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.error("Failed to fetch user tweets:", error);
            // Optionally dispatch an error action here
        }
    }, [dispatch, id]);

    // Fetch tweets of the users that the logged-in user is following
    const followingTweetHandler = useCallback(async () => {
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`, {
                withCredentials: true
            });
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.error("Failed to fetch following tweets:", error);
            // Optionally dispatch an error action here
        }
    }, [dispatch, id]);

    // Effect to fetch tweets based on the current active tab (isActive)
    useEffect(() => {
        if (isActive) {
            fetchMyTweets();
        } else {
            followingTweetHandler();
        }
    }, [isActive, refresh, fetchMyTweets, followingTweetHandler]);
};

export default useGetMyTweets;
