import { hasMany } from '@adonisjs/lucid/orm';
import Project from './project.ts';
import { type HasMany } from '@adonisjs/lucid/types/relations';
import { ThemeSchema } from '#database/schema';

export default class Theme extends ThemeSchema {


    @hasMany(() => Project)
    declare projects: HasMany<typeof Project>
}