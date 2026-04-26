<?php

namespace App\Http\Requests\Auth;

use App\Enums\Filiere;
use App\Enums\Grade;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

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
            'phone' => 'string|min:8|unique:users,phone',   
            'grade' => ['required', new Enum(Grade::class)],
            'filiere' => ['required', new Enum(Filiere::class)],
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
            'grade.required' => 'La filiere est requise',
            'filiere.required' => 'La filiere est requise',
            'matricule.required' => 'La filiere est requise',
            'matricule.unique' => 'Le matricule existe deja',
            'email.unique' => 'L\'email existe deja',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caracteres',
            'firstname.min' => 'Le prénom doit contenir au moins 3 caracteres',
            'lastname.min' => 'Le nom doit contenir au moins 3 caracteres',     
            'phone.unique' => 'Le numéro de téléphone existe deja',
            'phone.min' => 'Le numéro de téléphone doit contenir au moins 8 caracteres',    
        ];
    }
}
