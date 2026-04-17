import vine from '@vinejs/vine'

export const TeamMateValidator = vine.create({
    first_name: vine.string().minLength(3).maxLength(100),
    last_name: vine.string().minLength(3).maxLength(100),
    grade_id: vine.string(),
    filere_id: vine.string(),
    matricule: vine.string().minLength(3).maxLength(100).unique({ table: 'team_mates', column: 'matricule'})
})  