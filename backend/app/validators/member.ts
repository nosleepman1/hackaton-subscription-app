import vine from '@vinejs/vine'


export const MemberValidator = vine.create({
    userId: vine.string(),
    teamId: vine.string().optional(),
    teamMateId: vine.string().optional(),
})