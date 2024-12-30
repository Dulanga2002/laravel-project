<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Foundation\Validation\ValidatesRequests;

class CategoryController extends Controller
{
    use ValidatesRequests;

    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    public function show($id)
    {
        return new CategoryResource(Category::findOrFail($id));
    }
}
