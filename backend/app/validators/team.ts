import vine from '@vinejs/vine'


export const TeamValidator = vine.create({
    name: vine.string().minLength(3).maxLength(255),
    project_id: vine.string().exists({ table: 'projects' }),
    user_id: vine.string().exists({ table: 'users' }),  
    
})