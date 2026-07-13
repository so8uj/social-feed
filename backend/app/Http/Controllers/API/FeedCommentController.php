<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\FeedCommentResource;
use App\Models\Feed;
use App\Models\FeedComment;
use Illuminate\Http\JsonResponse;

class FeedCommentController extends Controller
{
    
    public function store(
        StoreCommentRequest $request,
        Feed $feed
    ): JsonResponse {

        
        if ($request->filled('parent_id')) {

            $parent = FeedComment::where('id', $request->parent_id)
                ->where('feed_id', $feed->id)
                ->first();

            if (!$parent) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid parent comment.'
                ], 422);
            }
        }

        $comment = FeedComment::create([
            'feed_id' => $feed->id,
            'user_id' => auth()->id(),
            'body' => $request->body,
            'parent_id' => $request->parent_id,
        ]);

        $comment->load([
            'user',
            'replies.user',
        ])->loadCount([
            'likes',
            'replies',
        ]);

        return response()->json([
            'success' => true,
            'message' => $request->parent_id
                ? 'Reply added successfully.'
                : 'Comment added successfully.',
            'data' => new FeedCommentResource($comment),
        ], 201);
    }

    public function toggleCommentLike(FeedComment $comment): JsonResponse
    {
        $like = FeedLike::where('user_id', auth()->id())
            ->where('likeable_type', FeedComment::class)
            ->where('likeable_id', $comment->id)
            ->first();

        if ($like) {

            $like->delete();

            return response()->json([
                'success' => true,
                'liked' => false,
                'message' => 'Comment like removed.',
                'likes_count' => $comment->likes()->count(),
            ]);
        }

        FeedLike::create([
            'user_id' => auth()->id(),
            'likeable_type' => FeedComment::class,
            'likeable_id' => $comment->id,
        ]);

        return response()->json([
            'success' => true,
            'liked' => true,
            'message' => 'Comment liked.',
            'likes_count' => $comment->likes()->count(),
        ]);
    }

}