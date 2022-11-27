import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Venda from 'App/Models/Venda'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Venda.createMany([
      {
        users_id: 1,
      },
      {
        users_id: 2,
      },
      {
        users_id: 3,
      },
    ])
  }
}
