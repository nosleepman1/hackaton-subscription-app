import Filere from '#models/filere'
import { FilereValidator } from '#validators/filere'
import type { HttpContext } from '@adonisjs/core/http'

export default class FilieresController {


    async index ({response} : HttpContext) {

        return response.status(200).json({
            message: "Liste des filieres",
            data: await Filere.all()
        })
    }

    async show({params, response}: HttpContext) {

        const filiere = await Filere.findByOrFail(params.id)

        return response.status(200).json({
            message: "filiere unique",
            data: filiere
        })
    }


    async store({request, response}: HttpContext) {

        const payload = await request.validateUsing(FilereValidator)

        const filiere = await Filere.create(payload)

        return response.status(201).json({
            message: "Filiere created successfully",
            data: filiere
        })
    }


    async update({params, request, response}: HttpContext) {

        const filere = await Filere.findOrFail(params.id)

        const newData = await request.validateUsing(FilereValidator)

        const data = filere.merge(newData)

        return response.status(201).json({
            message: "update successful",
            data
        })
    }


    async destroy({params, response}: HttpContext) {

        const filiere = await Filere.findOrFail(params.id)

        await filiere.delete()

        return response.status(200).json({
            message: "delete successful"     
        })
    }   

}