import { hasMany } from '@adonisjs/lucid/orm';
import User from './user.ts';
import { type HasMany } from '@adonisjs/lucid/types/relations'; 
import Project from './project.ts';
import { InterestedSchema } from '#database/schema';


export default class Interrested extends InterestedSchema {


    @hasMany(() => User)
    declare users: HasMany<typeof User>

    @hasMany(() => Project)
    declare projects: HasMany<typeof Project> 
}   