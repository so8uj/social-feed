<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeedResource extends JsonResource
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
            'body' => $this->body,
            'image' => $this->image
                ? asset($this->image)
                : null,
            'visibility' => $this->visibility,
            'user' => [
                'id' => $this->user->id,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
                'email' => $this->user->email,
            ],
            'likes_count' => $this->likes_count
                ?? $this->likes()->count(),
            'comments_count' => $this->comments_count
                ?? $this->comments()->count(),
            'comments' => FeedCommentResource::collection(
                $this->whenLoaded('comments')
            ),
            'created_at' => $this->created_at,
            'created_at_human' => $this->created_at->diffForHumans(),
        ];
    }
}
