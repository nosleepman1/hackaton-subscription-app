import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import User from '#models/user';
import Team from '#models/team';
import { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';   
import { DateTime } from 'luxon';



export default class Project extends BaseModel {

    static table = 'projects'

    @column({ isPrimary: true })
    declare id: string

    @column()
    declare name: string

    @column()
    declare description: string

    @column()
    declare userId: string

    @column()
    declare teamId: string

    @column.dateTime({columnName: 'created_at', autoCreate: true})
    declare createdAt: DateTime

    @column.dateTime({columnName: 'updated_at', autoCreate: true, autoUpdate: true})
    declare updatedAt: DateTime

    
}