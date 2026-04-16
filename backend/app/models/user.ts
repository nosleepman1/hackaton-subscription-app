import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { belongsTo, hasOne } from '@adonisjs/lucid/orm'
import Interrested from '#models/interrested'
import Team from '#models/team' 
import Grade from '#models/grade'
import Filere from '#models/filere'
import { type BelongsTo, type HasOne } from '@adonisjs/lucid/types/relations'


export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  
  
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  
  get initials() {
    const [first, last] = this.firstName && this.lastName ? this.firstName + ' ' + this.lastName : this.email.split('@')
    
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    } 
    
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  @hasOne(() => Interrested)
  declare interrested: HasOne<typeof Interrested>

  @hasOne(() => Team)
  declare team: HasOne<typeof Team>
  
  @belongsTo(() => Grade)
  declare grade: BelongsTo<typeof Grade>

  @belongsTo(() => Filere)
  declare filere: BelongsTo<typeof Filere>  
}
