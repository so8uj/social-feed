<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeedCommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'feed_id' => $this->feed_id,
            'parent_id' => $this->parent_id,
            'body' => $this->body,
            'likes_count' => $this->likes_count
                ?? $this->likes()->count(),
            'replies_count' => $this->replies_count
                ?? $this->replies()->count(),
            'created_at' => $this->created_at,
            'created_at_human' => $this->created_at->diffForHumans(),
            'user' => [
                'id' => $this->user->id,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
                'email' => $this->user->email,
            ],
            'replies' => FeedCommentResource::collection(
                $this->whenLoaded('replies')
            ),

        ];
    }
}
