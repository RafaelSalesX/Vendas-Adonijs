import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import VendaHasProduto from 'App/Models/VendaHasProduto'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await VendaHasProduto.createMany([
      {
        produtos_id: 1,
        vendas_id: 1,
      },
      {
        produtos_id: 1,
        vendas_id: 1,
      },
      {
        produtos_id: 2,
        vendas_id: 3,
      },
      {
        produtos_id: 2,
        vendas_id: 3,
      },
    ])
  }
}
