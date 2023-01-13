import { ApplicationConfigurationDto } from "@abp/ng.core";
import { create } from "zustand";
import { applicationConfiguration } from "../../apis/Abp";

interface ApplicationConfigurationState {
    configuration?: ApplicationConfigurationDto,
    Get: () => Promise<ApplicationConfigurationDto>
}
export const useApplicationConfigurationStore = create<ApplicationConfigurationState>()((set, get) => ({
    configuration: undefined,
    Get: async () => {
        const configuration = get().configuration;
        if (configuration === undefined) {
            const config = await applicationConfiguration.getApplicationConfiguration();
            set({ configuration: config.data });
            return config.data;
        }
        return configuration;
    }
}))