import Grade from '#models/grade'
import { GradeValidator } from '#validators/grade'
import type { HttpContext } from '@adonisjs/core/http'
import { messages } from '@vinejs/vine/defaults'

export default class GradesController {

    async index({response} : HttpContext) {

        return response.json({
            message: "Grades list",
            data: Grade.all()
        })
    }


    async store({request, response} : HttpContext) {

        const payload = await request.validateUsing(GradeValidator)

        const data = await Grade.create(payload)

        return response.status(201).json({
            message: "Grade created successfully",
            data
        })      
    }


    async show({params, response} : HttpContext) {

        const data = await Grade.findOrFail(params.id)

        return response.status(200).json({
            message: "Grade found successfully",
            data
        })
    }


    async update({params, request, response} : HttpContext) {

        const grade = await Grade.findOrFail(params.id)

        const payload = await request.validateUsing(GradeValidator)

        grade.merge(payload)

        await grade.save()

        return response.status(200).json({
            message: "Grade updated successfully",
            data: grade
        })
    }


    async destroy({params, response} : HttpContext) {

        const grade = await Grade.findOrFail(params.id)

        await grade.delete()

        return response.status(200).json({
            message: "Grade deleted successfully",
            data: grade
        })
    }   
}