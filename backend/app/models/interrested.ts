import { BaseModel, hasOne } from '@adonisjs/lucid/orm';
import { hasMany } from '@adonisjs/lucid/orm';
import User from './user.ts';
import { type HasMany, type HasOne } from '@adonisjs/lucid/types/relations'; 
import Project from './project.ts';


export default class Interrested extends BaseModel {


    @hasMany(() => User)
    declare users: HasMany<typeof User>

    @hasOne(() => Project)
    declare project: HasOne<typeof Project> 
}   