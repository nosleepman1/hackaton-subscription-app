import { BaseModel, hasMany, hasOne } from '@adonisjs/lucid/orm';
import User from './user.ts';
import { type HasOne, type HasMany } from '@adonisjs/lucid/types/relations';  
import Member from './member.ts';
import Project from './project.ts'; 


export default class Team extends BaseModel {

    
    @hasOne(() => User)
    declare user: HasOne<typeof User>

    @hasMany(() => Member)
    declare members: HasMany<typeof Member> 

    @hasOne(() => Project)
    declare project: HasOne<typeof Project>     
    
   
}