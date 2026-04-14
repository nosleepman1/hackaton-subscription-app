import { BaseModel } from '@adonisjs/lucid/orm';
import { hasMany } from '@adonisjs/lucid/orm';
import User from './user.ts';
import { type HasMany } from '@adonisjs/lucid/types/relations'; 


export default class Filere extends BaseModel {


    @hasMany(() => User)
    declare users: HasMany<typeof User>
}   