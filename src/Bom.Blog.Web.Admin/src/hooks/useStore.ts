import { useContext } from 'react';
import { storesContext } from '../stores';
import { abpApplicationConfigurationContext } from '../stores/Abp';

export const useStores = () => useContext(storesContext);
export const useAppConfig = () => useContext(abpApplicationConfigurationContext);
