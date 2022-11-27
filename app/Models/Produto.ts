import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Categoria from 'App/Models/Categoria'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public preco: number

  @column()
  public categoria_id: number

  @belongsTo(() => Categoria, { foreignKey: 'categoria_id' })
  public categoria: BelongsTo<typeof Categoria>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
