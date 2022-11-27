// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Venda from 'App/Models/Venda'

export default class VendasController {
  public async index({ response }: HttpContextContract) {
    const venda = await Venda.query()
    //precarrega os dados da tabela roles

    return response.status(201).json({ erro: false, message: 'Listagem concluida.', data: venda })
  }

  public async store({ request, response }: HttpContextContract) {
    // const body = await request.validate(VendaValidator)
    const body = request.body()
    const venda = await Venda.create(body)

    return response.status(201).json({ erro: false, message: 'Cadastro Concluido!', data: venda })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    //sucesso
    let consulta = await Venda.query().where({ id })

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
      const venda = await Venda.findOrFail(params.id)

      venda.merge(body)

      await venda.save()

      return response
        .status(201)
        .json({ erro: false, message: 'Atualizado com sucesso!', data: venda })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const venda = await Venda.findOrFail(params.id)

      await venda.delete()
      return response
        .status(201)
        .json({ erro: false, message: 'Excluido com sucesso!', data: venda })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }
}
