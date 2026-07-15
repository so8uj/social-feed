import callApi from "./callApi";

export default function feedService() {
    const { request } = callApi();

    
    const fetchFeeds = async () => {
        return await request({
            method: "GET",
            url: "/feeds",
        });
    };

    
    const createFeed = async (formData) => {
        return await request({
            method: "POST",
            url: "/feeds",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };
    
    const updateFeed = async (feedId, formData) => {
        return await request({
            method: "PUT",
            url: `/feeds/${feedId}`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    
    const deleteFeed = async (feedId) => {
        return await request({
            method: "DELETE",
            url: `/feeds/${feedId}`,
        });
    };

    
    const toggleFeedLike = async (feedId) => {
        return await request({
            method: "POST",
            url: `/feeds/${feedId}/like`,
        });
    };

    
    const createComment = async (
        feedId,
        payload
    ) => {

        return await request({
            method: "POST",
            url: `/feeds/${feedId}/comments`,
            data: payload,
        });
    };

   
    const deleteComment = async (commentId) => {
        return await request({
            method: "DELETE",
            url: `/feeds/comments/${commentId}`,
        });
    };

   
    const toggleCommentLike = async (commentId) => {
        return await request({
            method: "POST",
            url: `/feeds/comments/${commentId}/like`,
        });
    };

    return {
        fetchFeeds,
        createFeed,
        updateFeed,
        deleteFeed,
        toggleFeedLike,
        createComment,
        deleteComment,
        toggleCommentLike,
    };
}