<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user_id'       => 'exists:users, id',
            'image'         => 'nullable|string',
            'title'         => 'required|string|max:1000',
            'slug'          => 'required',
            'status'        => 'required|boolean',
            'description'   => 'nullable|string',
            'expire_date'   => 'nullable|date|after:today',
            'questions'     => 'array',
        ];
    }
}
