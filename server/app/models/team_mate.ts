import { TeamMateSchema } from '#database/schema'
import {  belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations' 
import Grade from '#models/grade'
import Filiere from '#models/filere'
import Member from './member.ts'

export default class TeamMate extends TeamMateSchema {

    @belongsTo(() => Grade)
    declare grade: BelongsTo<typeof Grade>

    @belongsTo(() => Filiere)
    declare filere: BelongsTo<typeof Filiere>  
    
    @hasMany(() => Member)
    declare members: HasMany<typeof Member> 
}