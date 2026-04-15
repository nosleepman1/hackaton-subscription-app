import Team from '#models/team'
import { TeamValidator } from '#validators/team'
import type { HttpContext } from '@adonisjs/core/http'




export default class TeamsController {
 
 
 
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {


    return response.json({
      message: "Teams list",
      data: Team
                .query()
                .preload('user')
                .preload('project')
                .preload('members')
                .orderBy('created_at', 'desc')
    })
  }


  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {

    const payload = await request.validateUsing(TeamValidator)

    const data = await Team.create(payload)

    return response.json({
      message: "Team created successfully",
      data
    })
  }


  
  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {

    const data = await Team.findOrFail(params.id)

    return response.json({
      message: "Team found successfully",
      data
    })
  }



  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {

    const team = await Team.findOrFail(params.id)

    const payload = await request.only(['name', 'projectId'])

    team.merge(payload)

    await team.save()

    return response.json({
      message: "Team updated successfully",
      data: team
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {

    const team = await Team.findByOrFail(params.id)

    await team.delete()

    return response.json({
      message: "Team deleted successfully",
      data: team
    })
  }
}