<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Foundation\Validation\ValidatesRequests;

class MovieController extends Controller
{
    use ValidatesRequests;

    public function index()
    {
        // return with pagination
        return Movie::paginate(6);
    }

    public function all()
    {
        return Movie::all();
    }

    public function show($id)
    {
        return Movie::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:movies',
            'description' => 'required|string|min:10',
            'release_date' => 'required|date|before_or_equal:today',
            'url' => 'required|url|unique:movies',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|url',
            'rating' => 'required|numeric|between:0,10',
        ]);

        try {
            $movie = Movie::create($validated);
            return response()->json([
                'message' => 'Movie created successfully',
                'data' => new \App\Http\Resources\MovieResource($movie)
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create movie',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $movie = Movie::findOrFail($id);

        $this->validate($request, [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'release_date' => 'sometimes|date',
            'url' => 'sometimes|url',
            'category_id' => 'sometimes|exists:categories,id',
            'image' => 'sometimes|string',
            'rating' => 'sometimes|numeric|between:0,10',
        ]);

        $movie->update($request->all());

        return new \App\Http\Resources\MovieResource($movie);
    }

    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();

        return response()->json(null, 204);
    }
}
