<?php

namespace App\Http\Requests\Interested;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreInterestedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'project_id' => 'required|exists:projects,id',
        ];
    }

    public function messages(): array
    {
        return [
            'project_id.required' => 'Le projet est requis.',
            'project_id.exists' => 'Le projet n\'existe pas.',
        ];
    }
}
