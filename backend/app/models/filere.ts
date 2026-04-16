import { hasMany } from '@adonisjs/lucid/orm';
import User from './user.ts';
import { type HasMany } from '@adonisjs/lucid/types/relations'; 
import { FiliereSchema } from '#database/schema';


export default class Filere extends FiliereSchema {


    @hasMany(() => User)
    declare users: HasMany<typeof User>
}   