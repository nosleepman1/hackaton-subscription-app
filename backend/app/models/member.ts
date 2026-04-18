import { belongsTo } from '@adonisjs/lucid/orm';
import User from './user.ts';
import Team from './team.ts';   
import { type BelongsTo } from '@adonisjs/lucid/types/relations'; 
import { MemberSchema } from '#database/schema';


export default class Member extends MemberSchema {


    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>

    @belongsTo(() => Team)
    declare team: BelongsTo<typeof Team> 
}       