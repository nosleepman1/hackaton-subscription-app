<?php

namespace App\Http\Requests\TeamMate;

use App\Enums\Filiere;
use App\Enums\Grade;
use App\Models\Team;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class StoreTeamMateRequest extends FormRequest
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
            'firstname' => 'required|string|min:2|max:255',
            'lastname'  => 'required|string|min:2|max:255',
            'email'     => 'required|email|max:255|unique:team_mates,email',
            'phone'     => 'required|string|max:20',
            'matricule' => 'required|string|max:20|unique:team_mates,matricule',
            'grade'     => ['required', new Enum(Grade::class)],
            'filiere'   => ['required', new Enum(Filiere::class)],
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
