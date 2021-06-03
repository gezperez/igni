import { AppStore } from './AppStore'
import { AuthStore } from './AuthStore'

export class RootStore {
  appStore

  authStore

  constructor() {
    this.appStore = new AppStore()
    this.authStore = new AuthStore()
  }
}
