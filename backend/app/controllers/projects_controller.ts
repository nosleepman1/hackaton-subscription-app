import Project from '#models/project'
import { ProjectValidator } from '#validators/project'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {

    async index({response}: HttpContext) {

        return response.json({
            message: "projects list",

            data: Project
                    .query()
                    .preload('theme')
                    .orderBy('created_at', 'desc')
        })
    }

    async store({request, response}: HttpContext) {

        const payload = await request.validateUsing(ProjectValidator)
        const project = await Project.create(payload)

        return response.json({
            message: "Project created successfully",
            data: project
        })  
    }

    async show({params, response}: HttpContext) {

        const data = await Project.findOrFail(params.id)

        return response.json({
            message: "project",
            data
        })

    }

    async update({params, request, response}: HttpContext) {

        const project = await Project.findOrFail(params.id)

        const payload = await request.validateUsing(ProjectValidator)

        project.merge(payload)

        await project.save()

        return response.json({
            message: "Project updated successfully",
            data: project
        })  
    }

    async destroy({params, response}: HttpContext) {

        const project = await Project.findOrFail(params.id)

        await project.delete()

        return response.json({
            message: "Project deleted successfully",
            data: project
        })  
    }   


   
}