import React from 'react';
import blogStore from './post';
import tagStore from './tag';
import categoryStore from './category';
import friendLinkStore from './friendLink';
import postStore from './post';
export const storesContext = React.createContext({
    blogStore,
    tagStore,
    categoryStore,
    friendLinkStore,
    postStore,
});
