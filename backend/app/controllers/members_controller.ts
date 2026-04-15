import Member from '#models/member'
import { MemberValidator } from '#validators/member'
import type { HttpContext } from '@adonisjs/core/http'

export default class MembersController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {

    return response.json({
        message: "members list",

        data: Member
                .query()
                .orderBy('created_at', 'desc')
    })
  }


  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {

    const payload = await request.validateUsing(MemberValidator)

    const data = await Member.create(payload)

    return response.json({
      message: "creation successfully",
      data
    })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}