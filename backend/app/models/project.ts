import { BaseModel, belongsTo, hasMany, hasOne } from '@adonisjs/lucid/orm';
import { type HasOne, type HasMany, type BelongsTo } from '@adonisjs/lucid/types/relations';
import User from './user.ts';
import Team from './team.ts';
import Theme from './theme.ts'; 
import Member from './member.ts';
import Interrested from './interrested.ts'; 




export default class Project extends BaseModel {

    @hasOne(() => User)
    declare user: HasOne<typeof User>

    @hasMany(() => Team)
    declare teams: HasMany<typeof Team>

    @belongsTo(() => Theme)
    declare theme: BelongsTo<typeof Theme>
    
    @hasMany(() => Interrested)
    declare interresteds: HasMany<typeof Interrested>    

    @hasMany(() => Member)
    declare members: HasMany<typeof Member>    
    

    
}