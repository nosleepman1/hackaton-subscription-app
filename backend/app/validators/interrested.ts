import vine from '@vinejs/vine'


export const InterrestedValidator = vine.create({
    userId: vine.string().exists({ table: 'users', column: 'id' }),
    projectId: vine.string().exists({ table: 'projects', column: 'id' })
})