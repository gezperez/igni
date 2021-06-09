import { isNil } from 'lodash'
import { observable } from 'mobx'

export class AuthStore {
  @observable username: string | undefined

  @observable accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI5OWY5NTYwZGJlOWIzMGQ1MWY5YWYiLCJpYXQiOjE2MjI3Nzc4MTAsImV4cCI6MTYyMzM4MjYxMH0.PTMI_7eSE8Limd74D6m0nV32ReWhigUylewWMf6XSDM'

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
