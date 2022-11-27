import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ApiTokenGensController {
  async store({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '60 mins',
      })
      return token
    } catch {
      return response.unauthorized('Credenciais Invalidas.')
    }
  }
}
