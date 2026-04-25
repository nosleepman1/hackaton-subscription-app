import vine from '@vinejs/vine'


export const TeamValidator = vine.create({
    name: vine.string().minLength(3).maxLength(255),
    project_id: vine.string().uuid().exists({ table: 'projects', column: 'id' }),
    user_id: vine.string().uuid().exists({ table: 'users', column: 'id' }),  
    
})