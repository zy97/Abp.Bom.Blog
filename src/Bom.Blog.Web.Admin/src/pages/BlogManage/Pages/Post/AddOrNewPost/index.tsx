import { useParams } from 'react-router-dom';

function AddOrEditPost() {
    const { postid } = useParams();
    return <div>{postid ? postid : 'null'}</div>;
}

export default AddOrEditPost;
