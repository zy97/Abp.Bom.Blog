import axios from "axios";
import { ApplicationConfigurationDto } from "../../data/models/Abp/AbpApplicationConfiguration";

export const getApplicationConfiguration = () => axios.get<ApplicationConfigurationDto>(`/api/abp/application-configuration`, {});