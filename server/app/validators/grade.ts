import vine from '@vinejs/vine'

export const GradeValidator = vine.create({
    name: vine.string().minLength(3).maxLength(100)
})  