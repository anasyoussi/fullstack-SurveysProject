<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // $survey = $this->route('survey');
        // if($this->user()->id !== $survey->user_id){
        //     return false; 
        // }
        return true;
    }


    protected function prepareForValidation()
    {
        $this->merge([
            'user_id'  => $this->user()->id,
        ]); 
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user_id'       => 'exists:users,id',  
            'image'         => 'nullable|string',
            'title'         => 'required|string|max:1000', 
            'status'        => 'required|boolean',
            'description'   => 'required|string',
            'expire_date'   => 'required|date|after:today',
            'questions'     => 'array',
        ];
    }
}
