import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import { type HasMany, type BelongsTo } from '@adonisjs/lucid/types/relations';
import Team from './team.ts';
import Theme from './theme.ts'; 
import Member from './member.ts';
import Interrested from './interrested.ts'; 
import { ProjectSchema } from '#database/schema';




export default class Project extends ProjectSchema {


    @hasMany(() => Team)
    declare teams: HasMany<typeof Team>

    @belongsTo(() => Theme)
    declare theme: BelongsTo<typeof Theme>
    
    @hasMany(() => Interrested)
    declare interresteds: HasMany<typeof Interrested>    

    @hasMany(() => Member)
    declare members: HasMany<typeof Member>    
    

    
}