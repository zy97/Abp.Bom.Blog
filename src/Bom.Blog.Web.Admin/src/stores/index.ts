import React from 'react';
import blogStore from './blog';
import tagStore from './tag';
import categoryStore from './category';
export const storesContext = React.createContext({
    blogStore,
    tagStore,
    categoryStore,
});
