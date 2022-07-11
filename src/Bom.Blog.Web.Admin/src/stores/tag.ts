import { AntdTableResult } from 'ahooks/lib/useAntdTable/types';
import { makeAutoObservable } from 'mobx';
import { tagApi } from '../apis';
import Tag from '../data/models/Tag';
class TagStore {
    constructor() {
        makeAutoObservable(this);
    }
    // getTags = () => {
    //     return tagApi
    //         .getTags()
    //         .then((posts) => {
    //             return {
    //                 total: posts.data.totalCount,
    //                 list: posts.data.items,
    //             };
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    getTags = async (data: any, form: any) => {
        // return tagApi
        //     .getTags()
        //     .then((posts) => {
        //         return {
        //             total: posts.data.totalCount,
        //             list: posts.data.items,
        //         };
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        try {
            const result = await tagApi.getTags({
                skipCount: data.pageSize * (data.current - 1),
                maxResultCount: data.pageSize,
            });
            return {
                total: result.data.totalCount,
                list: result.data.items,
            };
        } catch (error) {}
    };
}

export default new TagStore();
