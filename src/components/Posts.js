import React from 'react';

import api from '../utils/api';
import Post from './Post';

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
        console.log('posts', this.state.posts)
        return(
            <div>
                {
                    this.state.posts.map((post)=> <Post key={post.id} post={post} />)
                }
            </div>
        )
    }
}

export default Posts;