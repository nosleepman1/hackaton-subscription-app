import vine from '@vinejs/vine'


export const MemberValidator = vine.create({
    user_id: vine.string().exists({ table: 'users' }),
    team_id: vine.string().exists({ table: 'teams' }).nullable(),
    team_mate_id: vine.string().exists({ table: 'team_mates' }).nullable(),    
})