import { useEffect } from "react";
import useStores from "../../../../hooks/useStore";

function Blog() {
    const { blogStore } = useStores();
    useEffect(() => {
        blogStore.getPosts();
    }, []);
    return (
        <div>博客管理</div>
    );
}

export default Blog;