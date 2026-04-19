import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Interrested from '#models/interrested'
import Team from '#models/team' 
import Grade from '#models/grade'
import Filere from '#models/filere'
import { belongsTo, hasOne, hasMany } from '@adonisjs/lucid/orm'
import { type BelongsTo, type HasOne, type HasMany } from '@adonisjs/lucid/types/relations'
import Member from './member.ts'


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


  @hasMany(() => Interrested)
  declare interrested: HasMany<typeof Interrested>



  @hasOne(() => Team)
  declare team: HasOne<typeof Team>

  @hasOne(() => Member)
  declare member: HasOne<typeof Member>
  


  @belongsTo(() => Grade)
  declare grade: BelongsTo<typeof Grade>

  @belongsTo(() => Filere)
  declare filere: BelongsTo<typeof Filere>  
}
