import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Categoria from 'App/Models/Categoria'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await Categoria.createMany([
      {
        nome: 'Biscoitos',
      },
      {
        nome: 'Frutas',
      },
      {
        nome: 'Legumes',
      },
    ])
  }
}
