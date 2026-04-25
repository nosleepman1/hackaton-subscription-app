<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'firstname' => 'string|min:3',
            'lastname' => 'string|min:3',
            'email' => 'string|unique:users,email',
            'password' => 'string|min:8',
            'grade_id' => 'integer|exists:grades,id',
            'filiere_id' => 'integer|exists:filieres,id',
            'matricule' => 'string|unique:users,matricule',
        ];
    }

    public function messages(): array
    {
        return [
            'firstname.required' => 'Le prénom est requis',
            'lastname.required' => 'Le nom est requis',
            'email.required' => 'L\'email est requis',
            'password.required' => 'Le mot de passe est requis',
            'grade_id.required' => 'La filiere est requise',
            'filiere_id.required' => 'La filiere est requise',
            'matricule.required' => 'La filiere est requise',
            'matricule.unique' => 'Le matricule existe deja',
            'email.unique' => 'L\'email existe deja',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caracteres',
            'firstname.min' => 'Le prénom doit contenir au moins 3 caracteres',
            'lastname.min' => 'Le nom doit contenir au moins 3 caracteres',
            'grade_id.exists' => 'La filiere est invalide',
            'filiere_id.exists' => 'La filiere est invalide',
        ];
    }
}
