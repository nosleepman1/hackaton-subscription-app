<?php

namespace App\Http\Requests\Member;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMemberRequest extends FormRequest
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
            'user_id' => 'required_without:team_mate_id|nullable|exists:users,id',
            'team_mate_id' => 'required_without:user_id|nullable|exists:team_mates,id',
            'team_id' => 'nullable|exists:teams,id',
        ];
    }
    
    public function messages(): array
    {
        return [
            'user_id.exists' => 'L\'utilisateur n\'existe pas.',
            'team_mate_id.exists' => 'Le coequipier n\'existe pas.',
            'team_id.exists' => 'L\'equipe n\'existe pas.',
        ];
    }
}
