<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Feed;
use App\Models\FeedComment;
use App\Models\FeedLike;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;

class FeedLikeController extends Controller
{
  
    public function toggle_feed_like(Feed $feed): JsonResponse
    {
        return response()->json([
            'success' => true,
            ...$this->toggle_like($feed),
        ]);
    }

 
    public function toggle_comment_like(FeedComment $comment): JsonResponse
    {
        return response()->json([
            'success' => true,
            ...$this->toggle_like($comment),
        ]);
    }

   
    private function toggle_like(Model $model): array
    {
        $userId = auth()->id();

        $like = FeedLike::where([
            'user_id'       => $userId,
            'likeable_type' => get_class($model),
            'likeable_id'   => $model->id,
        ])->first();

        if ($like) {

            $like->delete();

            return [
                'liked' => false,
                'message' => 'Like removed.',
                'likes_count' => $model->likes()->count(),
            ];
        }

        FeedLike::create([
            'user_id'       => $userId,
            'likeable_type' => get_class($model),
            'likeable_id'   => $model->id,
        ]);

        return [
            'liked' => true,
            'message' => 'Liked successfully.',
            'likes_count' => $model->likes()->count(),
        ];
    }
}