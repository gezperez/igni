import {getModel, getVersion} from 'react-native-device-info';
import {observable} from 'mobx';

export class AppStore {
  @observable requireMandatoryUpdate = false;

  @observable maintenanceMode = false;

  @observable version: string = getVersion();

  @observable deviceModel: string = getModel();

  setMandatoryUpdateAsRequired(): void {
    this.requireMandatoryUpdate = true;
  }

  enableMaintenanceMode(): void {
    this.maintenanceMode = true;
  }
}
