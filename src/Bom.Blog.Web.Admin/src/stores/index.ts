import React from 'react';
import blogStore from './blog';
import tagStore from './tag';
export const storesContext = React.createContext({
    blogStore,
    tagStore,
});
