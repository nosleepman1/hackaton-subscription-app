import vine from '@vinejs/vine'


export const MemberValidator = vine.compile(
    vine.object({
        userId: vine.string(),
        teamId: vine.string().nullable(),
        teamMateId: vine.string().nullable(),
    })
)