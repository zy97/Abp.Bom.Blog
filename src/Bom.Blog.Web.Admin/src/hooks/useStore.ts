import { useContext } from 'react';
import { storesContext } from '../stores';

const useStores = () => useContext(storesContext);
export default useStores;
