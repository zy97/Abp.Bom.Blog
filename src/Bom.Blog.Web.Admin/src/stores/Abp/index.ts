import React from "react";
import applicationConfigurationStore from "./ApplicationConfiguration"
import emailSettingStore from "./EmailSetting"
export const abpApplicationConfigurationContext = React.createContext({
    applicationConfigurationStore,
    emailSettingStore,
});
