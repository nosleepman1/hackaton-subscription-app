import { hasMany, hasOne } from '@adonisjs/lucid/orm';
import User from './user.ts';
import { type HasMany, type HasOne } from '@adonisjs/lucid/types/relations'; 
import Project from './project.ts';
import { InterestedSchema } from '#database/schema';


export default class Interrested extends InterestedSchema {


    @hasMany(() => User)
    declare users: HasMany<typeof User>

    @hasOne(() => Project)
    declare project: HasOne<typeof Project> 
}   