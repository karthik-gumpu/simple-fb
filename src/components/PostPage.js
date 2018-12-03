import React from 'react';

import api from '../utils/api';
import PostCard from './PostCard'

class PostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { post: null };
    }

    componentDidMount() {
        api({ url: `/posts/${this.props.params.postId}`})
        .then((post) => this.setState({ post }))        
    }

    render(){
        if(!this.state.post) {
            return <div> Loading wait...</div>
        }
        return(
            <PostCard post={this.state.post}/>
        )
    }
}

export default PostPage;