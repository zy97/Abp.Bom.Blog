import React from 'react';
import blogStore from './blog';
import tagStore from './tag';
import categoryStore from './category';
import friendLinkStore from './friendLink';
export const storesContext = React.createContext({
    blogStore,
    tagStore,
    categoryStore,
    friendLinkStore,
});
