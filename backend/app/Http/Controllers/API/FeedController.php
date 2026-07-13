<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFeedRequest;
use App\Http\Requests\UpdateFeedRequest;
use App\Http\Resources\FeedResource;
use App\Models\Feed;
use App\Services\ImageUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function __construct(
        protected ImageUploadService $imageService
    ) {
    }


    public function index(Request $request): JsonResponse
    {
        $feeds = Feed::query()
            ->where(function ($query) {

                $query->where('visibility', 'public')
                    ->orWhere(function ($query) {

                        $query->where('visibility', 'private')
                            ->where('user_id', auth()->id());

                    });

            })
            ->with([
                'user',
                'comments' => function ($query) {
                    $query->with([
                        'user',
                        'replies.user',
                    ]);
                }
            ])
            ->withCount([
                'likes',
                'comments',
            ])
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => FeedResource::collection($feeds),
            'meta' => [
                'current_page' => $feeds->currentPage(),
                'last_page' => $feeds->lastPage(),
                'per_page' => $feeds->perPage(),
                'total' => $feeds->total(),
            ]
        ]);
    }

  
    public function store(StoreFeedRequest $request): JsonResponse
    {
        $image = null;

        if ($request->hasFile('image')) {

            $image = $this->imageService->upload(
                $request->file('image'),
                'feed'
            );
        }

        $feed = Feed::create([
            'user_id' => auth()->id(),
            'body' => $request->body,
            'image' => $image,
            'visibility' => $request->visibility,
        ]);

        $feed->load('user')
            ->loadCount(['likes', 'comments']);

        return response()->json([
            'success' => true,
            'message' => 'Feed created successfully.',
            'data' => new FeedResource($feed),
        ], 201);
    }

    
    public function show(Feed $feed): JsonResponse
    {
        if (
            $feed->visibility === 'private'
            && $feed->user_id !== auth()->id()
        ) {
            abort(403);
        }

        $feed->load([
            'user',
            'comments.user',
            'comments.replies.user',
        ])
        ->loadCount([
            'likes',
            'comments',
        ]);

        return response()->json([
            'success' => true,
            'data' => new FeedResource($feed),
        ]);
    }

    
    public function update(
        UpdateFeedRequest $request,
        Feed $feed
    ): JsonResponse {

        abort_if(
            $feed->user_id !== auth()->id(),
            403
        );

        if ($request->hasFile('image')) {

            $this->imageService->delete($feed->image);

            $feed->image = $this->imageService->upload(
                $request->file('image'),
                'feed'
            );
        }

        $feed->body = $request->body;

        $feed->visibility = $request->visibility;

        $feed->save();

        $feed->load('user')
            ->loadCount([
                'likes',
                'comments',
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Feed updated successfully.',
            'data' => new FeedResource($feed),
        ]);
    }

  
    public function destroy(Feed $feed): JsonResponse
    {
        abort_if(
            $feed->user_id !== auth()->id(),
            403
        );

        $this->imageService->delete($feed->image);

        $feed->delete();

        return response()->json([
            'success' => true,
            'message' => 'Feed deleted successfully.',
        ]);
    }
}