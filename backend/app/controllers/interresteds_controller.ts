import Interrested from '#models/interrested'
import type { HttpContext } from '@adonisjs/core/http'

export default class InterrestedsController {
    async index({ response }: HttpContext) {
        return response.json({
            message: "interresteds list",
            data: Interrested   
                    .query()
                    .orderBy('created_at', 'desc')
        })
    }

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(InterrestedValidator)

        const data = await Interrested.create(payload)

        return response.json({
            message: "creation successfully",
            data
        })
    }

    async show({ params, response }: HttpContext) {
        const data = await Interrested.findOrFail(params.id)

        return response.json({
            message: "interrested found",
            data
        })
    }

    async update({ params, request, response }: HttpContext) {
        const data = await Interrested.findOrFail(params.id)

        if(data) {
            const payload = await request.validateUsing(InterrestedValidator)

            data.merge(payload)

            await data.save()

            return response.json({
                message: "updated successfully",
                data
            })
        }

        return response.json({
            message: "interrested not found"
        })
    }

    async destroy({ params, response }: HttpContext) {
        const data = await Interrested.findOrFail(params.id)

        if(data) {
            await data.delete()

            return response.json({
                message: "deleted successfully",
                data
            })
        }

        return response.json({
            message: "interrested not found"
        })
    }
}   