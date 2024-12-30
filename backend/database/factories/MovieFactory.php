<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MovieFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => 'The Shawshank Redemption',
            'description' => 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            'release_date' => '1994-09-23',
            'url' => 'https://www.imdb.com/title/tt0111161/',
            'rating' => 'R',
            'image' => 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
        ];
    }
}
