<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

 


    public function definition(): array
    {
        $projects = [
                [
                    'name' => 'Application d\'installation de logiciel',
                    'description' => 'Application d\'installation de logiciel qui permet d\'installer des logiciels sur des ordinateurs',
                ],
                [
                    'name' => 'Application de gestion de projet',
                    'description' => 'Application de gestion de projet qui permet de suivre les projets',
                ],
                [
                    'name' => 'Application de gestion des absences',
                    'description' => 'Application de gestion des absences qui permet de suivre les absences des etudiants',
                ],
                [
                    'name' => 'Application de gestion des stages',
                    'description' => 'Application de gestion des stages qui permet de suivre les stages des etudiants',
                ],
                [
                    'name' => 'Application de gestion des evenements',
                    'description' => 'Application de gestion des evenements qui permet de suivre les evenements',
                ],
                [
                    'name' => 'Application de gestion des etudiant',
                    'description' => 'Application de gestion des etudiant qui permet de suivre les etudiants',
                ],
                [
                    'name' => 'Application de gestion des enseignants',
                    'description' => 'Application de gestion des enseignants qui permet de suivre les enseignants',
                ],
                [
                    'name' => 'Application de gestion des matieres',
                    'description' => 'Application de gestion des matieres qui permet de suivre les matieres',
                ],
                [
                    'name' => 'Application de gestion des notes',
                    'description' => 'Application de gestion des notes qui permet de suivre les notes',
                ],
                
            ];

        
        $projets= $this->faker->randomElement($projects); 
        
        return [
                'name' => $projets['name'],
                'description' => $projets['description'],
                'theme_id' => $this->faker->numberBetween(1, 10),
            ];
    }
}
