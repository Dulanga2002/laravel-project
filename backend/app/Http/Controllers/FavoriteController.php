<?php

namespace App\Http\Controllers;

use App\Http\Resources\FavoriteResource;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    use ValidatesRequests;

    public function index()
    {
        return FavoriteResource::collection(
            Auth::user()->favorites()->with('movie')->get()
        );
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'movie_id' => 'required|exists:movies,id',
        ]);

        // Check if already favorited
        $existing = Favorite::where('user_id', Auth::id())
            ->where('movie_id', $request->movie_id)
            ->first();
            
        if ($existing) {
            return new FavoriteResource($existing);
        }

        $favorite = new Favorite();
        $favorite->user_id = Auth::id();
        $favorite->movie_id = $request->movie_id;
        $favorite->save();

        return new FavoriteResource($favorite->load('movie'));
    }

    public function destroy($id)
    {
        $favorite = Favorite::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();
            
        $favorite->delete();
        
        return response()->json(['message' => 'Favorite removed']);
    }
}
