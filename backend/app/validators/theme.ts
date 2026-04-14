import vine from '@vinejs/vine'


export const ThemeValidator = vine.create({
    name: vine.string().minLength(3).maxLength(255),    
    description: vine.string().minLength(3)
})