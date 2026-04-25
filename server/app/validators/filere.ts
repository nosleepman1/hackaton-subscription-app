import vine from '@vinejs/vine'

export const FilereValidator = vine.create({
    name: vine.string().minLength(3).maxLength(100)
})