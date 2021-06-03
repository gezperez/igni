import { isNil } from 'lodash'
import { observable } from 'mobx'

export class AuthStore {
  @observable username: string | undefined

  @observable accessToken: string | undefined

  @observable refreshToken: string | undefined

  @observable loading = false

  @observable sessionHasExpired = false

  get isAuthenticated() {
    return !isNil(this.accessToken)
  }

  setHeaderToken(token: string): void {
    this.accessToken = token
  }

  setSessionAsExpired() {
    this.sessionHasExpired = true
  }
}
