import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Produto from 'App/Models/Produto'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    Produto.createMany([
      {
        nome: 'Vitarella',
        preco: 50,
        categoria_id: 1,
      },
      {
        nome: 'Abacate',
        preco: 5,
        categoria_id: 2,
      },
      {
        nome: 'Tomate',
        preco: 10,
        categoria_id: 3,
      },
    ])
  }
}
