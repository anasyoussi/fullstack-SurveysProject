<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    { 
        return [
            'id'            => $this->id ,
            'title'         => $this->title ,
            'image'         => $this->image ? URL::to($this->image) : null,
            'slug'          => !!$this->slug ,  // !! to convert value to bool
            'description'   => $this->description ,
            'expire_date'   => Carbon::parse($this->expire_date)->format('Y-m-d'),            
            'created_at'    => Carbon::parse($this->created_at->format('Y-m-d H:i:s'))->toDateString(),            
            'updated_at'    => Carbon::parse($this->updated_at->format('Y-m-d H:i:s'))->toDateString(),  
            'questions'     => SurveyQuestionsResource::collection($this->questions),         
        ]; 
    }
}
