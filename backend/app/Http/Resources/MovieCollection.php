<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MovieCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->map(function ($movie) {
                return [
                    'id' => $movie->id,
                    'title' => $movie->title,
                    'description' => $movie->description,
                    'release_date' => $movie->release_date,
                    'url' => $movie->url,
                    'category_id' => $movie->category->id,
                    'image' => $movie->image,
                    'rating' => $movie->rating,
                ];
            }),
        ];
    }
}
