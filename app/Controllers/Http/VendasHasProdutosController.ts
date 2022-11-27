import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VendaHasProduto from 'App/Models/VendaHasProduto'
import VendaHasProdutoValidator from 'App/Validators/VendaHasProdutoValidator'

export default class VendasHasProdutosController {
  public async index({ response }: HttpContextContract) {
    const vendasProdutos = await VendaHasProduto.query()
    //precarrega os dados da tabela roles

    return response
      .status(201)
      .json({ erro: false, message: 'Listagem concluida.', data: vendasProdutos })
  }

  public async store({ request, response }: HttpContextContract) {
    const body = await request.validate(VendaHasProdutoValidator)
    // const body = request.body()
    const vendasProdutos = await VendaHasProduto.create(body)

    return response
      .status(201)
      .json({ erro: false, message: 'Cadastro Concluido!', data: vendasProdutos })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    //sucesso
    let consulta = await VendaHasProduto.query().where({ id })

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
      const vendasProdutos = await VendaHasProduto.findOrFail(params.id)

      vendasProdutos.merge(body)

      await vendasProdutos.save()

      return response
        .status(201)
        .json({ erro: false, message: 'Atualizado com sucesso!', data: vendasProdutos })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const vendasProdutos = await VendaHasProduto.findOrFail(params.id)

      await vendasProdutos.delete()
      return response
        .status(201)
        .json({ erro: false, message: 'Excluido com sucesso!', data: vendasProdutos })
    } catch (e) {
      return response
        .status(404)
        .json({ erro: true, message: 'Nenhum registro encontrado com o ID: ' + params.id })
    }
  }
}
