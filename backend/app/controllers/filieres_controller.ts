import Filere from '#models/filere'
import { FilereValidator } from '#validators/filere'
import type { HttpContext } from '@adonisjs/core/http'

export default class FilieresController {


    async index ({response} : HttpContext) {

        return response.status(200).json({
            message: "Liste des filieres",
            data: Filere.all()
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

        const payload = request.validateUsing(FilereValidator)

        if(payload) {
            await Filere.create(payload)

            return response.status(201).json({
                message: "Filiere created successfully",
                data: payload
            })  
        }
    }

}