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
  async show({ params, response  }: HttpContext) {

    const data = await Member.findOrFail(params.id)

    return response.json({
        message: "member found",
        data
    })
  }


  async update({ params, request, response  }: HttpContext) {

    const data = await Member.findOrFail(params.id)

    if(data) {
      const payload = await request.validateUsing(MemberValidator)

      data.merge(payload)

      await data.save()

      return response.json({
          message: "updated successfully",
          data
      })
    }
    
    return response.json({
        message: "member not found"
    })  
  }

  /**
   * Delete record
   */
  async destroy({ params, response   }: HttpContext) {

    const data = await Member.findOrFail(params.id)

    if(data) {
      await data.delete()

      return response.json({
          message: "deleted successfully",
          data
      })
    }
    
    return response.json({
        message: "member not found"
    })  
    }
}