import vine from '@vinejs/vine'


export const InterrestedValidator = vine.create({
    userId: vine.string().uuid().exists({ table: 'users', column: 'id' }),
    projectId: vine.string().uuid().exists({ table: 'projects', column: 'id' })
})      