<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use App\Models\User;
use App\Models\Feed;
use App\Models\FeedLike;
use App\Models\FeedComment;


#[Fillable(['feed_id', 'user_id', 'body', 'parent_id'])]

class FeedComment extends Model
{
    public function feed(): BelongsTo
    {
        return $this->belongsTo(Feed::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(FeedComment::class, 'parent_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(FeedComment::class, 'parent_id')->latest();
    }

    public function likes(): MorphMany
    {
        return $this->morphMany(FeedLike::class, 'likeable');
    }
}
