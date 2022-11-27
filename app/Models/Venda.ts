import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Produto from 'App/Models/Produto'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public data: DateTime

  @column()
  public users_id: number

  @belongsTo(() => User, { foreignKey: 'users_id' })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Produto, { pivotTable: 'produtos' })
  public produtos: ManyToMany<typeof Produto>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
