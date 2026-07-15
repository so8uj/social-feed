import { createContext, useContext, useEffect, useState } from "react";
import useFeed from "../hooks/useFeed";
import { useAuth } from "./AuthContext";

export const FeedContext = createContext();

export function FeedProvider({ children }) {
  const feedHook = useFeed();

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeeds = async () => {
    setLoading(true);

    try {
      const response = await feedHook.fetchFeeds();

      setFeeds(response.data || []);
      setError(null);

      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load feeds.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createFeed = async (formData) => {
    setLoading(true);
    try {
      const response = await feedHook.createFeed(formData);
      return fetchFeeds();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create feed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const updateFeed = async (feedId, formData) => {
    setLoading(true);
    try {
      const response = await feedHook.updateFeed(feedId, formData);
      return fetchFeeds();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update feed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteFeed = async (feedId) => {
    try {
      await feedHook.deleteFeed(feedId);
      setFeeds((prev) => prev.filter((feed) => feed.id !== feedId));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete feed.");
      throw err;
    }
  };

  const toggleFeedLike = async (feedId) => {
    try {
      await feedHook.toggleFeedLike(feedId);
      return fetchFeeds();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update like.");
      throw err;
    }
  };

  const createComment = async (feedId, body) => {
    try {
      await feedHook.createComment(feedId, body);
      return fetchFeeds();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update like.");
      throw err;
    }
  };

  const toggleCommentLike = async (commentId) => {
    try {
      await feedHook.toggleCommentLike(commentId);
      return fetchFeeds();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update like.");
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      fetchFeeds();
    } else {
      setFeeds([]);
    }
  }, [authenticated]);

  const value = {
    feeds,
    loading,
    error,
    createFeed,
    updateFeed,
    deleteFeed,
    toggleFeedLike,
    createComment,
    toggleCommentLike,
    clearError,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export const useFeedContext = () => useContext(FeedContext);
