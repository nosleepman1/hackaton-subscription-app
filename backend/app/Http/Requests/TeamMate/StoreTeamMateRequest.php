<?php

namespace App\Http\Requests\TeamMate;

use App\Models\Team;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTeamMateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Team::where('user_id', Auth::id())->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => 'required|string|max:255',
            'lastname'  => 'required|string|max:255',
            'email'     => 'required|email|max:255',
            'phone'     => 'required|string|max:20',
        ];
    }

    public function messages(): array
    {
        return [
            'firstname.required' => 'Le prénom est requis.',
            'lastname.required'  => 'Le nom est requis.',
            'email.required'     => 'L\'email est requis.',
            'email.email'        => 'L\'email doit être valide.',
            'phone.required'     => 'Le téléphone est requis.',
        ];
    }
}
