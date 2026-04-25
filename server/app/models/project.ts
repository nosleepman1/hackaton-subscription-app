import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type {  BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Team from './team.ts';
import Theme from './theme.ts'; 
import Interrested from './interrested.ts'; 
import { ProjectSchema } from '#database/schema';




export default class Project extends ProjectSchema {


    @hasMany(() => Team)
    declare team: HasMany<typeof Team>

    @belongsTo(() => Theme)
    declare theme: BelongsTo<typeof Theme>
    
    @hasMany(() => Interrested)
    declare interresteds: HasMany<typeof Interrested>    

}