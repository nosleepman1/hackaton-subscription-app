<?php
// ThemeFactory.php

namespace Database\Factories;

use App\Models\Theme;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Theme>
 */
class ThemeFactory extends Factory
{
    public function definition(): array
    {
        $themes = [
            [
                'name' => 'Santé & Bien-être',
                'description' => 'Solutions innovantes pour améliorer la santé, le suivi médical et le bien-être des populations.',
            ],
            [
                'name' => 'Éducation & Formation',
                'description' => 'Outils numériques pour révolutionner l\'apprentissage, l\'accès au savoir et la formation professionnelle.',
            ],
            [
                'name' => 'Agriculture & Alimentation',
                'description' => 'Technologies pour optimiser la production agricole, réduire le gaspillage et garantir la sécurité alimentaire.',
            ],
            [
                'name' => 'Mobilité & Transport',
                'description' => 'Innovations pour des déplacements plus intelligents, durables et accessibles en milieu urbain et rural.',
            ],
            [
                'name' => 'Environnement & Énergie',
                'description' => 'Solutions pour la transition énergétique, la gestion des ressources naturelles et la lutte contre le changement climatique.',
            ],
            [
                'name' => 'Inclusion Financière',
                'description' => 'Services financiers numériques pour les populations non bancarisées et les petites entreprises.',
            ],
            [
                'name' => 'Gouvernance & Citoyenneté',
                'description' => 'Plateformes pour améliorer les services publics, la transparence et la participation citoyenne.',
            ],
            [
                'name' => 'Sécurité & Gestion des crises',
                'description' => 'Systèmes d\'alerte, de prévention et de réponse aux catastrophes naturelles et aux situations d\'urgence.',
            ],
            [
                'name' => 'Commerce & Entrepreneuriat',
                'description' => 'Outils pour soutenir les entrepreneurs locaux, digitaliser le commerce et développer les marchés.',
            ],
            [
                'name' => 'Culture & Tourisme',
                'description' => 'Applications valorisant le patrimoine culturel, les arts locaux et le tourisme responsable.',
            ],
        ];

        $theme = $this->faker->unique()->randomElement($themes);

        return [
            'name'        => $theme['name'],
            'description' => $theme['description'],
        ];
    }
}