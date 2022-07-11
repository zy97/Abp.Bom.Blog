import { makeAutoObservable } from 'mobx';
import { blogApi } from '../apis';
class BlogStore {
    constructor() {
        makeAutoObservable(this);
    }
    getPosts = () => {
        return blogApi
            .getPosts()
            .then((posts) => {
                console.log(posts);
                return posts;
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export default new BlogStore();
