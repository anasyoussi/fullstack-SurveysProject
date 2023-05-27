<?php

namespace App\Models;

use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Survey extends Model
{
    use HasFactory;
    use HasSlug;

    protected $primaryKey = 'id'; 

    protected $table = 'surveys'; 

    protected $fillable = ['user_id', 'image', 'title', 'status', 'description', 'expire_date']; 


    /**
    * Get the options for generating the slug.
    */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
                ->generateSlugsFrom('title')
                ->saveSlugsTo('slug');
    }

    public function questions()
    {
        return $this->hasMany(SurveyQuestion::class); 
    }
}
