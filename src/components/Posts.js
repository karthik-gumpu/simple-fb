import React from 'react';
import $ from 'jquery';

import api from '../utils/api';
import PostCard from './PostCard';
import Loading from './Loading';

const PAGE_LIMIT = 10;

class Posts extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={ posts: [], nextPage : 1, loading: false };
    }

    componentDidMount() {
        this.fetchPosts();
        window.addEventListener('scroll', this.onPageScroll) 
    }
    onPageScroll = () => {

        // Fetch more posts when scroll reaches to the bottom of page
        if($(window).scrollTop() + $(window).height() === $(document).height()) {
            this.fetchPosts();
        }
    }
    fetchPosts = () => {

        // Dont fetch posts if previous request is still in-progress
        // or when there are no more records (then nextPage is -1)

        if(this.state.loading || this.state.nextPage === -1) {
            return false;
        }

        let url = `/posts?_expand=user&_page=${this.state.nextPage}&_limit=${PAGE_LIMIT}`;
        if(this.props.params.userId) {
            url = `${url}&userId=${this.props.params.userId}`
        }
        this.setState({ loading: true });
        this.fetchingPosts = api({ url })
        .then((posts) => {
            this.setState((prevState) => ({
                posts: [...prevState.posts, ...posts],
                nextPage: posts.length ? prevState.nextPage + 1 : -1,
                loading: false,
            }));
        },() => {
            this.setState({ loading: false })
        });
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onPageScroll);

        // Cancel pending request
        if(this.fetchingPosts) {
            this.fetchingPosts.cancel();
        }
    }
    render() {
        return(
            <div>
                {
                    this.state.posts.map((post)=> (
                        <PostCard key={post.id} post={post} {...this.props}/>
                    ))
                }
                {
                    this.state.loading && <Loading />
                }
            </div>
        )
    }
}

export default Posts;