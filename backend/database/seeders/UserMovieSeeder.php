<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserMovieSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Dulanga',
            'email' => 'dulanga@admin.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create regular user
        User::create([
            'name' => 'Dulanga',
            'email' => 'dulanga@user.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Create categories
        $categories = [
            ['name' => 'Drama', 'description' => 'Movies that are serious in tone or subject, and often not focused on action.'],
            ['name' => 'Action', 'description' => 'Movies that are fast-paced, with plenty of action, often involving physical feats.'],
            ['name' => 'Romance', 'description' => 'Movies that are about love, relationships, and emotions.'],
            ['name' => 'Fantasy', 'description' => 'Movies that are imaginative, often involving magic or supernatural phenomena.'],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        // Create movies
        $movies = [
            [
                'name' => 'The Shawshank Redemption',
                'description' => 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
                'rating' => '9.3',
                'release_date' => '1994-09-23',
                'category_id' => 1,
                'url' => 'https://www.imdb.com/title/tt0111161/'
            ],
            [
                'name' => 'The Dark Knight',
                'description' => 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
                'rating' => '9.0',
                'release_date' => '2008-07-18',
                'category_id' => 2,
                'url' => 'https://www.imdb.com/title/tt0468569/'
            ],
            [
                'name' => 'Inception',
                'description' => 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
                'rating' => '8.8',
                'release_date' => '2010-07-16',
                'category_id' => 2,
                'url' => 'https://www.imdb.com/title/tt1375666/'
            ],
            [
                'name' => 'Pulp Fiction',
                'description' => "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                'image' => 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
                'rating' => '8.9',
                'release_date' => '1994-10-14',
                'category_id' => 1,
                'url' => 'https://www.imdb.com/title/tt0110912/'
            ],
            [
                'name' => 'The Matrix',
                'description' => 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
                'rating' => '8.7',
                'release_date' => '1999-03-31',
                'category_id' => 2,
                'url' => 'https://www.imdb.com/title/tt0133093/'
            ],
            [
                'name' => 'Forrest Gump',
                'description' => 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
                'rating' => '8.8',
                'release_date' => '1994-07-06',
                'category_id' => 3,
                'url' => 'https://www.imdb.com/title/tt0109830/'
            ],
            [
                'name' => 'The Lord of the Rings: The Return of the King',
                'description' => "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
                'image' => 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
                'rating' => '9.0',
                'release_date' => '2003-12-17',
                'category_id' => 4,
                'url' => 'https://www.imdb.com/title/tt0167260/'
            ],
            [
                'name' => 'Spirited Away',
                'description' => "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
                'image' => 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
                'rating' => '8.6',
                'release_date' => '2001-07-20',
                'category_id' => 4,
                'url' => 'https://www.imdb.com/title/tt0245429/'
            ],
            [
                'name' => 'Parasite',
                'description' => 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
                'rating' => '8.5',
                'release_date' => '2019-05-30',
                'category_id' => 1,
                'url' => 'https://www.imdb.com/title/tt6751668/'
            ],
            [
                'name' => 'The Godfather',
                'description' => 'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant son.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
                'rating' => '9.2',
                'release_date' => '1972-03-24',
                'category_id' => 1,
                'url' => 'https://www.imdb.com/title/tt0068646/'
            ],
            [
                'name' => 'The Lion King',
                'description' => 'A young lion prince is cast out of his pride by a jealous uncle, who claims he killed his father. While the uncle rules with an iron paw, the prince grows up beyond the savanna, living by a philosophy: No worries for the rest of your days.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtM2EzLWE3MTgtZWQ3LT5mbjkyMTY3N2ZkXkEyXkFqcGdeQXVyNjY1MTY1Mzc@._V1_.jpg',
                'rating' => '8.5',
                'release_date' => '1994-06-24',
                'category_id' => 4,
                'url' => 'https://www.imdb.com/title/tt0110357/'
            ],
            [
                'name' => 'Interstellar',
                'description' => 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BZjdkOTY3MDktN2Y0OS00YjM1LTlkNzQtNzY2OTFlNTcwM2ZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
                'rating' => '8.7',
                'release_date' => '2014-11-07',
                'category_id' => 2,
                'url' => 'https://www.imdb.com/title/tt0816692/'
            ],
            [
                'name' => 'The Green Mile',
                'description' => 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg',
                'rating' => '8.6',
                'release_date' => '1999-12-10',
                'category_id' => 1,
                'url' => 'https://www.imdb.com/title/tt0120689/'
            ],
            [
                'name' => 'Gladiator',
                'description' => 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA3L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
                'rating' => '8.5',
                'release_date' => '2000-05-05',
                'category_id' => 2,
                'url' => 'https://www.imdb.com/title/tt0172495/'
            ],
            [
                'name' => 'Saving Private Ryan',
                'description' => 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BZjhkMDM4MzEtZTVjOC00ZDRhLThmZGEtYjRmMjE1MEJmN2ZiXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg',
                'rating' => '8.6',
                'release_date' => '1998-07-24',
                'category_id' => 2,
                'url' => 'https://www.imdb.com/title/tt0120815/'
            ],
            [
                'name' => 'The Departed',
                'description' => 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjI3._V1_.jpg',
                'rating' => '8.5',
                'release_date' => '2006-10-06',
                'category_id' => 1,
                'url' => 'https://www.imdb.com/title/tt0407887/'
            ],
            [
                'name' => 'The Prestige',
                'description' => 'Two stage magicians engage in a competitive battle to create the ultimate illusion.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMjA4NDI0ODAxNF5BMl5BanBnXkFtZTcwNTM0NzMzMw@@._V1_.jpg',
                'rating' => '8.5',
                'release_date' => '2006-10-20',
                'category_id' => 4,
                'url' => 'https://www.imdb.com/title/tt0482571/'
            ],
            [
                'name' => 'Whiplash',
                'description' => 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
                'rating' => '8.5',
                'release_date' => '2014-10-10',
                'category_id' => 1,
                'url' => 'https://www.imdb.com/title/tt2582802/'
            ],
            [
                'name' => 'The Pianist',
                'description' => 'A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BOWRiZDIxZjktMTA1NC00MDQ2LWEzMjUtMTliZmY3NjQ3ODUzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
                'rating' => '8.5',
                'release_date' => '2002-12-06',
                'category_id' => 1,
                'url' => 'https://www.imdb.com/title/tt0253474/'
            ],
            [
                'name' => 'The Intouchables',
                'description' => 'After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_.jpg',
                'rating' => '8.5',
                'release_date' => '2011-11-02',
                'category_id' => 1,
                'url' => 'https://www.imdb.com/title/tt1675434/'
            ],
            [
                'name' => 'Coco',
                'description' => 'Aspiring musician Miguel, confronted with his family\'s ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzIzM2VjODZhXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_.jpg',
                'rating' => '8.4',
                'release_date' => '2017-11-22',
                'category_id' => 4,
                'url' => 'https://www.imdb.com/title/tt2380307/'
            ],
            [
                'name' => 'WALL-E',
                'description' => 'In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_.jpg',
                'rating' => '8.4',
                'release_date' => '2008-06-27',
                'category_id' => 4,
                'url' => 'https://www.imdb.com/title/tt0910970/'
            ],
            [
                'name' => 'Your Name.',
                'description' => 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. But when a life-altering event threatens to unravel their bond, they must embark on a journey to find each other.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1MDkzYjE3XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg',
                'rating' => '8.4',
                'release_date' => '2016-08-26',
                'category_id' => 4,
                'url' => 'https://www.imdb.com/title/tt5311514/'
            ],
            [
                'name' => 'Avengers: Endgame',
                'description' => 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.',
                'image' => 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
                'rating' => '8.4',
                'release_date' => '2019-04-26',
                'category_id' => 2,
                'url' => 'https://www.imdb.com/title/tt4154796/'
            ]
        ];

        foreach ($movies as $movieData) {
            Movie::create($movieData);
        }
    }
}
