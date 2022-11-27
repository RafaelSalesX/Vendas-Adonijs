import Route from '@ioc:Adonis/Core/Route'

Route.resource('/login', 'ApiTokenGensController').apiOnly()

Route.group(() => {
  Route.resource('/users', 'UsersController').apiOnly()
  Route.resource('/categorias', 'CategoriasController').apiOnly()
  Route.resource('/produtos', 'ProdutosController').apiOnly()
  Route.resource('/vendasProdutos', 'VendasHasProdutosController').apiOnly()
  Route.resource('/vendas', 'VendasController').apiOnly()
})
  .prefix('/api')
  .middleware('auth:api')
