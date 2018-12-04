import React from 'react';

import api from '../utils/api';
import PostCard from './PostCard';
import Loading from './Loading';
import Commnets from './Comments';

class PostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { post: null };
    }

    componentDidMount() {
        api({ url: `/posts/${this.props.params.postId}?_expand=user`})
        .then((post) => this.setState({ post }));    
    }

    render(){
        if(!this.state.post) {
            return <Loading />
        }

        return(
            <div>
                <PostCard post={this.state.post} {...this.props} />
                <hr />
                <Commnets {...this.props}/>
            </div>
        )
    }
}

export default PostPage;