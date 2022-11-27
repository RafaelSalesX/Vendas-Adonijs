import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const user = await User.query()

    return response.status(201).json({ erro: false, message: 'Listagem concluida.', data: user })
  }

  public async store({ request, response }: HttpContextContract) {
    const body = await request.validate(UserValidator)
    // const body = request.body()
    const user = await User.create(body)

    return response.status(201).json({ erro: false, message: 'Cadastro Concluido!', data: user })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    //sucesso
    let consulta = await User.query().where({ id })

    if (consulta.length > 0) {
      return response
        .status(201)
        .json({ erro: false, message: 'Listagem concluida.', data: consulta })
    } else {
      return response.status(404).json({ erro: false, message: 'Nenhum registro encontrado.' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()

    try {
      const user = await User.findOrFail(params.id)

      user.merge(body)

      await user.save()

      return response
        .status(201)
        .json({ erro: false, message: 'Atualizado com sucesso!', data: user })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)

      await user.delete()
      return response
        .status(201)
        .json({ erro: false, message: 'Excluido com sucesso!', data: user })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }
}
