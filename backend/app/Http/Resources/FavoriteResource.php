<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FavoriteResource extends JsonResource
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
            'user_id' => $this->user_id,
            'movie_id' => $this->movie_id,
            'movie' => $this->whenLoaded('movie', function() {
                return [
                    'id' => $this->movie->id,
                    'name' => $this->movie->name,
                    'description' => $this->movie->description,
                    'image' => $this->movie->image,
                    'rating' => $this->movie->rating,
                    'release_date' => $this->movie->release_date,
                    'category_id' => $this->movie->category_id,
                    'url' => $this->movie->url,
                    'created_at' => $this->movie->created_at,
                    'updated_at' => $this->movie->updated_at,
                ];
            }),
            'created_at' => $this->created_at,
        ];
    }
}
