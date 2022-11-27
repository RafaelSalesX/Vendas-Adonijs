import { DateTime } from 'luxon'
import { BaseModel, hasMany, column, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Produto from 'App/Models/Produto'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Produto)
  public produtos: HasMany<typeof Produto>
}
