import { ApplicationConfigurationDto } from "@abp/ng.core";
import { makeAutoObservable, runInAction } from "mobx";
import { applicationConfiguration } from "../../apis/Abp";

class ApplicationConfigurationStore {
    private config?: ApplicationConfigurationDto
    constructor() {
        makeAutoObservable(this);
    }
    async Get() {
        if (this.config === undefined) {
            const config = await applicationConfiguration.getApplicationConfiguration();
            this.config = config.data;
            return this.config;
        }
        return this.config;
    }
}
const applicationConfigurationStore = new ApplicationConfigurationStore()
export default applicationConfigurationStore;
