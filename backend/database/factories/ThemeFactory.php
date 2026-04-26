<?php

namespace Database\Factories;

use App\Models\Theme;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Theme>
 */
class ThemeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $themes = [
            'Intelligence artificielle',
            'Internet des objets',
            'Blockchain',
            'Cybersecurité',
            'Cloud computing',
            'Big data',
            'Réalité virtuelle',
            'Réalité augmentée',
            'Machine learning',
            'Deep learning',
        ];
        $theme = $this->faker->randomElement($themes);
        return [
            'name' => $theme,
            'description' => $this->faker->text(),  
        ];
    }
}
