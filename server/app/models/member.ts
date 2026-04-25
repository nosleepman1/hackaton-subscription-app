import { belongsTo } from '@adonisjs/lucid/orm';
import Team from './team.ts';   
import { type BelongsTo } from '@adonisjs/lucid/types/relations'; 
import { MemberSchema } from '#database/schema';
import TeamMate from './team_mate.ts';


export default class Member extends MemberSchema {


    @belongsTo(() => TeamMate)
    declare user: BelongsTo<typeof TeamMate>

    @belongsTo(() => Team)
    declare team: BelongsTo<typeof Team> 
}       