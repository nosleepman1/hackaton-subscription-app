import TeamMate from '#models/team_mate'
import type { HttpContext } from '@adonisjs/core/http'
import { TeamMateValidator } from '#validators/team_mate'

export default class TeamMatesController {


    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(TeamMateValidator)
        const teamMate = await TeamMate.create(data)    
        return response.status(201).json(teamMate)
    }



    async index({ response }: HttpContext) {
        const teamMates = await TeamMate.all()
        return response.status(200).json(teamMates)
    }



    async show({ params, response }: HttpContext) {
        const teamMate = await TeamMate.findOrFail(params.id)
        return response.status(200).json(teamMate)
    }



    async update({ params, request, response }: HttpContext) {
        const teamMate = await TeamMate.findOrFail(params.id)
        const data = await request.validateUsing(TeamMateValidator)
        teamMate.merge(data)
        await teamMate.save()
        return response.status(200).json(teamMate)
    }


    
    async destroy({ params, response }: HttpContext) {
        const teamMate = await TeamMate.findOrFail(params.id)
        await teamMate.delete()
        return response.status(200).json(teamMate)
    }   
}   