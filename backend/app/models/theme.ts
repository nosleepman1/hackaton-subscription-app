import { BaseModel, hasMany } from '@adonisjs/lucid/orm';
import Project from './project.ts';
import { type HasMany } from '@adonisjs/lucid/types/relations';

export default class Theme extends BaseModel {


    @hasMany(() => Project)
    declare projects: HasMany<typeof Project>
}