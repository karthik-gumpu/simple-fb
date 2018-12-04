import React from 'react';

import api from '../utils/api';
import PostCard from './PostCard';
import Loading from './Loading';

class Posts extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={ posts: null };
    }

    componentDidMount() {
        let url = '/posts?_expand=user'
        if(this.props.params.userId) {
            url = `${url}&userId=${this.props.params.userId}`
        }
        api({ url })
        .then((posts) => {
            this.setState({ posts });
        });
    }
    render() {
        if(!this.state.posts) {
            return <Loading />
        }
        if(!this.state.posts.length) {
            return "No posts available";
        }
        return(
            <div>
                {
                    this.state.posts.map((post)=> <PostCard key={post.id} post={post} {...this.props}/>)
                }
            </div>
        )
    }
}

export default Posts;