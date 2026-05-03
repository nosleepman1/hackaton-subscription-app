<?php
// ProjectFactory.php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    public function definition(): array
    {
        $projects = [
            // Santé & Bien-être (theme_id 1)
            [
                'name'        => 'MediTrack',
                'description' => 'Application de suivi des consultations médicales et des ordonnances pour les patients en zones rurales.',
                'theme_id'    => 1,
            ],
            [
                'name'        => 'NutriScan',
                'description' => 'Scanner alimentaire basé sur l\'IA pour analyser la valeur nutritionnelle des repas en temps réel.',
                'theme_id'    => 1,
            ],

            // Éducation & Formation (theme_id 2)
            [
                'name'        => 'EduConnect',
                'description' => 'Plateforme d\'apprentissage hors-ligne permettant aux élèves sans connexion internet d\'accéder aux cours.',
                'theme_id'    => 2,
            ],
            [
                'name'        => 'SkillBridge',
                'description' => 'Marketplace mettant en relation des jeunes en recherche de formation avec des artisans et professionnels locaux.',
                'theme_id'    => 2,
            ],

            // Agriculture & Alimentation (theme_id 3)
            [
                'name'        => 'AgriAlert',
                'description' => 'Système d\'alerte précoce pour les agriculteurs basé sur des capteurs IoT et des prévisions météo locales.',
                'theme_id'    => 3,
            ],
            [
                'name'        => 'FoodChain',
                'description' => 'Solution de traçabilité alimentaire via blockchain pour garantir la qualité des produits du champ à l\'assiette.',
                'theme_id'    => 3,
            ],

            // Mobilité & Transport (theme_id 4)
            [
                'name'        => 'RideShare Local',
                'description' => 'Application de covoiturage communautaire pour les trajets interurbains en zones peu desservies.',
                'theme_id'    => 4,
            ],
            [
                'name'        => 'TrafficSense',
                'description' => 'Outil de cartographie intelligente du trafic urbain alimenté par les données des usagers en temps réel.',
                'theme_id'    => 4,
            ],

            // Environnement & Énergie (theme_id 5)
            [
                'name'        => 'SolarMap',
                'description' => 'Plateforme d\'identification des zones à fort potentiel solaire pour faciliter le déploiement de panneaux photovoltaïques.',
                'theme_id'    => 5,
            ],
            [
                'name'        => 'WasteWise',
                'description' => 'Application de gestion et de tri des déchets avec système de points de récompense pour les citoyens.',
                'theme_id'    => 5,
            ],

            // Inclusion Financière (theme_id 6)
            [
                'name'        => 'MicroLend',
                'description' => 'Plateforme de microcrédit peer-to-peer ciblant les petits commerçants et artisans non bancarisés.',
                'theme_id'    => 6,
            ],
            [
                'name'        => 'PayEasy',
                'description' => 'Wallet mobile léger fonctionnant sur téléphones basiques pour les transactions du quotidien sans smartphone.',
                'theme_id'    => 6,
            ],

            // Gouvernance & Citoyenneté (theme_id 7)
            [
                'name'        => 'CivicVoice',
                'description' => 'Plateforme de signalement citoyen permettant de remonter des problèmes d\'infrastructure aux autorités locales.',
                'theme_id'    => 7,
            ],
            [
                'name'        => 'OpenBudget',
                'description' => 'Outil de visualisation des budgets publics communaux pour renforcer la transparence et la confiance des citoyens.',
                'theme_id'    => 7,
            ],

            // Sécurité & Gestion des crises (theme_id 8)
            [
                'name'        => 'DisasterReady',
                'description' => 'Application d\'alerte et de coordination communautaire en cas de catastrophe naturelle ou d\'urgence sanitaire.',
                'theme_id'    => 8,
            ],
            [
                'name'        => 'SafeZone',
                'description' => 'Carte collaborative de sécurité alimentée par les signalements des habitants pour prévenir les risques urbains.',
                'theme_id'    => 8,
            ],

            // Commerce & Entrepreneuriat (theme_id 9)
            [
                'name'        => 'ShopLocal',
                'description' => 'Marketplace de proximité permettant aux petits commerces de vendre leurs produits en ligne simplement.',
                'theme_id'    => 9,
            ],
            [
                'name'        => 'BizMentor',
                'description' => 'Assistant IA pour aider les jeunes entrepreneurs à rédiger leur business plan et trouver des financements.',
                'theme_id'    => 9,
            ],

            // Culture & Tourisme (theme_id 10)
            [
                'name'        => 'HeritageTour',
                'description' => 'Application de visite guidée immersive des sites culturels et historiques via réalité augmentée.',
                'theme_id'    => 10,
            ],
            [
                'name'        => 'ArtisanHub',
                'description' => 'Vitrine numérique pour les artisans locaux permettant de vendre leurs créations à l\'international.',
                'theme_id'    => 10,
            ],
        ];

        $project = $this->faker->randomElement($projects);

        return [
            'name'        => $project['name'],
            'description' => $project['description'],
            'theme_id'    => $project['theme_id'],
        ];
    }
}