import { AppStore } from './AppStore'
import { AuthStore } from './AuthStore'

export class RootStore {
  appStore: any

  authStore: any

  constructor() {
    this.appStore = new AppStore()
    this.authStore = new AuthStore()
  }
}
