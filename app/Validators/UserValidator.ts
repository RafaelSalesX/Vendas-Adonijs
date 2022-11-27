import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    nome: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.required(),
      rules.alpha({ allow: ['space'] }),
    ]),

    email: schema.string({ trim: true }, [
      rules.email({
        ignoreMaxLength: true,
        allowIpDomain: true,
        domainSpecificValidation: true,
      }),
      rules.normalizeEmail({
        // allLowercase: true,
        gmailRemoveDots: false,
        gmailRemoveSubaddress: true,
      }),
      rules.required(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),

    password: schema.string({ trim: true }, [
      rules.confirmed('passwordConfirmation'),
      rules.minLength(8),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] }),
    ]),

    telefone: schema.number([rules.required()]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'password_confirmation.confirmed': 'Senha não confere',
    'maxLength': 'O campo pode conter no máximo comprimento do caractere',
    'minLength': 'O campo pode conter no mínimo  comprimento do caractere',
    'required': 'Campo obrigatorio ! ',
    'unique': 'Já existe usuario  cadastrado com esse dados  !',
  }
}
