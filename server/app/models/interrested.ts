import { belongsTo } from '@adonisjs/lucid/orm';
import User from './user.ts';
import { type BelongsTo } from '@adonisjs/lucid/types/relations'; 
import Project from './project.ts';
import { InterestedSchema } from '#database/schema';


export default class Interrested extends InterestedSchema {


    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>

    @belongsTo(() => Project)
    declare project: BelongsTo<typeof Project> 
}   