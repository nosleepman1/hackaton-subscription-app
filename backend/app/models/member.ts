import { hasMany, hasOne } from '@adonisjs/lucid/orm';
import User from './user.ts';
import Team from './team.ts';   
import { type HasMany, type HasOne } from '@adonisjs/lucid/types/relations'; 
import { MemberSchema } from '#database/schema';


export default class Member extends MemberSchema {


    @hasMany(() => User)
    declare users: HasMany<typeof User>

    @hasOne(() => Team)
    declare team: HasOne<typeof Team> 
}       