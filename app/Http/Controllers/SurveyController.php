<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $user = $request->user(); 

        return SurveyResource::collection( Survey::where('user_id', $user->id )
               ->orderBy('created_at', 'desc')
               ->paginate(6)
        ); 
    } 

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();  
        
        // check if image was given and save an local file system
        if(isset($data['image'])){
            $relativePath   = $this->saveImage($data['image']);
            $data['image']  = $relativePath; 
        }

        $survey = Survey::create($data); 

        // Create new questions
        foreach($data['questions'] as $question){
            $question['survey_id'] = $survey->id; 
            $this->createQuestion($question);
        }

        return new SurveyResource($survey); 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if($user->id !== $survey->user_id){
            return abort(403, 'Unauthorized action'); 
        }
        return new SurveyResource($survey);
    } 

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        // check if image was given and save an Local file system
        $data = $request->validated();
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']); 
            $data['image'] = $relativePath; 

            // if there is an old image, delete it 
            if($survey->image){
                $absolutePath = public_path($survey->image); 
                File::delete($absolutePath); 
            }
        }

        // update survey in the database 
        $survey->update($data); 

        // get Ids as plain array of existing questions 
        $existingIds = $survey->question()->pluk('id')->toArray(); 
        // Get ids as plain array of new questions 
        $newIds = Arr::pluck($data['questions'], 'id');
        // Find questions to delete
        $toDelete = array_diff($existingIds, $newIds); 
        // find questions to add
        $toAdd = array_diff($newIds, $existingIds); 

        // Delete new Questions by $toDelete array
        SurveyQuestion::destroy($toDelete);

        foreach($data['questions'] as $question){
            if(in_array($question['id'], $toAdd)){
                $question['survey_id'] = $survey->id; 
                $this->createQuestion($question); 
            }
        }

        // Update existing questions 
        $questionMap = collect($data['questions'])->keyBy('id'); 
        foreach($survey->questions as $question){
            if(isset($questionMap[$question->id])){
                $this->updateQuestion($question, $questionMap[$question->id]); 
            }
        }

        return new SurveyResource($survey); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if($user->id !== $survey->user_id){
            return abort(404, 'Unauthorized action.'); 
        }
        
        $survey->delete(); 

        if($survey->image){
            $absolutePath = public_path($survey->image); 
            File::delete($absolutePath);
        }

        return response('', 204); 
    }

    /**
     * Save image in local file system and return saved image path
     * 
     * @param $image 
     * @throws \Exception
     * 
     */ 
    private function saveImage($image)
    {
        // check if image is valide base64 string
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)){
            // take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1); 
            // Get fille extention 
            $type = strtolower($type[1]); // jpg, png, gif 

            // Check if file is an image 
            if(!in_array($type, ['jpg', 'jpeg', 'gif', 'png']))
            {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image); 
            $image = base64_decode($image); 

            if($image === false)
            {
                throw new \Exception('base64_decode failed'); 
            }

        } else {
            throw new  \Exception('did not match data URI with image data'); 
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type; 
        $absolutePath = public_path($dir); 
        $relativePath = $dir . $file;
        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image); 

        return $relativePath; 
    }

    private function createQuestion($data)
    { 
        if(is_array($data['data'])){
            $data['data'] = json_encode($data['data']); 
        } 
        $validator = Validator::make($data, [
            'question'      => 'required|string',
            // 'type'          => ['required', Rule::in(['text', 'textarea', 'select', 'radio', 'checkbox'])],
            'type'          => ['required', new Enum(QuestionTypeEnum::class)],
            'description'   => 'nullable|string',
            'data'          => 'present',
            'survey_id'     => 'exists:App\Models\Survey,id',
        ]);

        return SurveyQuestion::create($validator->validated()); 

    }

    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if(is_array($data['data'])){
            $data['data'] = json_encode($data['data']); 
        }

        $validator = Validator::make($data, [
            'id'            => 'exists:App\Models\SurveyQuestion, id',
            'question'      => 'required|string',
            'type'          => ['required', new Enum(QuestionTypeEnum::class)],
            'description'   => 'nullable|string',
            'data'          => 'present',
        ]);

        return $question->update($validator->validated());
    }
}
