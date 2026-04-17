import { TeamMateSchema } from '#database/schema'
import {  belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations' 
import Grade from '#models/grade'
import Filiere from '#models/filere'

export default class TeamMate extends TeamMateSchema {

    @belongsTo(() => Grade)
    declare grade: BelongsTo<typeof Grade>

    @belongsTo(() => Filiere)
    declare filere: BelongsTo<typeof Filiere>   
}