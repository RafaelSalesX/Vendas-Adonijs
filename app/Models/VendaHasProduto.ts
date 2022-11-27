import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Produto from 'App/Models/Produto'
import Venda from 'App/Models/Venda'

export default class VendaHasProduto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vendas_id: number

  @column()
  public produtos_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Produto, { foreignKey: 'produtos_id' })
  public produto: BelongsTo<typeof Produto>

  @belongsTo(() => Venda, { foreignKey: 'vendas_id' })
  public venda: BelongsTo<typeof Venda>
}
