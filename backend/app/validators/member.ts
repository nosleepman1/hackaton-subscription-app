import vine from '@vinejs/vine'


export const MemberValidator = vine.create({
    userId: vine.string().uuid().exists({ table: 'users', column: 'id' }),
    teamId: vine.string().uuid().exists({ table: 'teams', column: 'id' }).optional(),
    teamMateId: vine.string().uuid().exists({ table: 'team_mates', column: 'id' }).optional(),
})  