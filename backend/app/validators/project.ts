import vine from '@vinejs/vine'


export const ProjectValidator = vine.create({
    name: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3),
    theme_id: vine.string().exists({ table: 'themes' }),
})