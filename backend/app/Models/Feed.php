<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use App\Models\User;
use App\Models\FeedComment;
use App\Models\FeedLike;

#[Fillable(['user_id', 'body', 'image', 'visibility'])]

class Feed extends Model
{

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(FeedComment::class)
            ->whereNull('parent_id')
            ->latest();
    }

    public function likes(): MorphMany
    {
        return $this->morphMany(FeedLike::class, 'likeable');
    }

}
