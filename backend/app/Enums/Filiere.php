<?php

namespace App\Enums;

enum Filiere: string
{
    case GL = "GL";
    case IAGE = "IAGE";
    case RI = "RI";
    case CS = "CS";

    public function label(): string
    {
        return match ($this) {
            self::GL => "Génie Logiciel",
            self::IAGE => "Informatique Appliquée à la Gestion des Entreprises",
            self::RI => "Réseaux et Informatique",
            self::CS => "Cybersécurité",
        };
    }
}
