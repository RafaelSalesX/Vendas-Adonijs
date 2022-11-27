import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'
import ProdutoValidator from 'App/Validators/ProdutoValidator'

export default class ProdutosController {
  public async index({ response }: HttpContextContract) {
    const produtos = await Produto.query().preload('categoria')
    //precarrega os dados da tabela roles

    return response
      .status(201)
      .json({ erro: false, message: 'Listagem concluida.', data: produtos })
  }

  public async store({ request, response }: HttpContextContract) {
    const body = await request.validate(ProdutoValidator)
    // const body = request.body()
    const produtos = await Produto.create(body)

    return response
      .status(201)
      .json({ erro: false, message: 'Cadastro Concluido!', data: produtos })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    //sucesso
    let consulta = await Produto.query().where({ id })

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
      const produtos = await Produto.findOrFail(params.id)

      produtos.merge(body)

      await produtos.save()

      return response
        .status(201)
        .json({ erro: false, message: 'Atualizado com sucesso!', data: produtos })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const produtos = await Produto.findOrFail(params.id)

      await produtos.delete()
      return response
        .status(201)
        .json({ erro: false, message: 'Excluido com sucesso!', data: produtos })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }
}
