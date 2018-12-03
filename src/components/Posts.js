import React from 'react';

import api from '../utils/api';
import PostCard from './PostCard';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state={ posts: [] };
    }

    componentDidMount() {
        api({
            url: '/posts'
        }).then((posts) => {
            this.setState({ posts })
        });
    }
    render() {
        return(
            <div>
                {
                    this.state.posts.map((post)=> <PostCard key={post.id} post={post} />)
                }
            </div>
        )
    }
}

export default Posts;