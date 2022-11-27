import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'
import CategoriaValidator from 'App/Validators/CategoriaValidator'

export default class CategoriasController {
  public async index({ response }: HttpContextContract) {
    const categoria = await Categoria.query()
    //precarrega os dados da tabela roles

    return response
      .status(201)
      .json({ erro: false, message: 'Listagem concluida.', data: categoria })
  }

  public async store({ request, response }: HttpContextContract) {
    const body = await request.validate(CategoriaValidator)
    // const body = request.body()
    const categoria = await Categoria.create(body)

    return response
      .status(201)
      .json({ erro: false, message: 'Cadastro Concluido!', data: categoria })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    //sucesso
    let consulta = await Categoria.query().where({ id })

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
      const categoria = await Categoria.findOrFail(params.id)

      categoria.merge(body)

      await categoria.save()

      return response
        .status(201)
        .json({ erro: false, message: 'Atualizado com sucesso!', data: categoria })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const categoria = await Categoria.findOrFail(params.id)

      await categoria.delete()
      return response
        .status(201)
        .json({ erro: false, message: 'Excluido com sucesso!', data: categoria })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }
}
