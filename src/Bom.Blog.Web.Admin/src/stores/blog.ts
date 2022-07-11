import { makeAutoObservable } from 'mobx';
import { blogApi } from '../apis';
class BlogStore {
    constructor() {
        makeAutoObservable(this);
    }
    getPosts = () => {
        blogApi
            .getPosts()
            .then((posts) => {
                console.log(posts);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export default new BlogStore();
