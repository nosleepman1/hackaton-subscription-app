import { belongsTo, hasMany, hasOne } from '@adonisjs/lucid/orm';
import User from './user.ts';
import { type HasOne, type HasMany, type BelongsTo } from '@adonisjs/lucid/types/relations';  
import Member from './member.ts';
import Project from './project.ts'; 
import { TeamSchema } from '#database/schema';


export default class Team extends TeamSchema {  

    
    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>

    @hasMany(() => Member)
    declare members: HasMany<typeof Member> 

    @hasOne(() => Project)
    declare project: HasOne<typeof Project>     
    
   
}