<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $primaryKey = 'id'; 

    protected $foreignKey = 'survey_id'; 

    protected $fillable = ['id', 'type', 'question', 'description', 'data', 'survey_id']; 

    public function Survey()
    {
        return $this->belongsTo(Survey::class); 
    }
}
