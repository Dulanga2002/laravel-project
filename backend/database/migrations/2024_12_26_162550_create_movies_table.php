<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('name')->unique();
            $table->text('description');
            $table->date('release_date');
            $table->string('url')->unique();
            $table->decimal('rating', 3, 1); // Allows values like 9.3
            $table->foreignId('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
