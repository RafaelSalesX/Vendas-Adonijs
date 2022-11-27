import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        nome: 'Rafael',
        email: 'Rafa@gmail.com',
        password: '123456789',
        telefone: 6181818106,
      },
      {
        nome: 'Vitor',
        email: 'vitor@gmail.com',
        password: '123456789',
        telefone: 6181818106,
      },
      {
        nome: 'Joao',
        email: 'joao@gmail.com',
        password: '123456789',
        telefone: 6181818106,
      },
    ])
  }
}
