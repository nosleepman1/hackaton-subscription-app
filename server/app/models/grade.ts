import { hasMany } from '@adonisjs/lucid/orm';
import User from './user.ts';
import { type HasMany } from '@adonisjs/lucid/types/relations'; 
import { GradeSchema } from '#database/schema';

export default class Grade extends GradeSchema {


    @hasMany(() => User)
    declare users: HasMany<typeof User>
}