import { makeAutoObservable } from "mobx";
import { applicationConfiguration } from "../../apis/Abp";
import { ApplicationConfigurationDto } from "../../data/models/Abp/AbpApplicationConfiguration";

class ApplicationConfigurationStore {
    private config: ApplicationConfigurationDto | null
    constructor() {
        makeAutoObservable(this);
        this.config = null;
    }
    async Get() {
        try {
            if (this.config == null) {
                const config = await applicationConfiguration.getApplicationConfiguration();
                this.config = config.data;
                return this.config;
            }
            return this.config;
        }
        catch {
            return null;
        }
    }
}

export default new ApplicationConfigurationStore();
