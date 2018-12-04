import React from 'react';
import $ from 'jquery';

import api from '../utils/api';
import Loading from './Loading';

const PAGE_LIMIT = 10;

const Comment = React.memo(({ comment }) => (
    <div className="card">
        <h6> {comment.name} </h6>
        <p> {comment.body} </p>
        <small><i> Commented By : {comment.email} </i></small>
    </div>
));

class Comments extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { comments: [], nextPage: 1, loading: false };
    }

    componentDidMount(){
        this.fetchComments();
        window.addEventListener('scroll', this.onPageScroll);
    }
    onPageScroll = () => {

        // Fetch more comments when scroll reaches bottom of page
        if($(window).scrollTop() + $(window).height() === $(document).height()) {
            this.fetchComments();
        }
    }
    fetchComments = () => {

        // Don't fetch posts if previous request is still in-progress
        // or when there are no more records (then nextPage is -1)
        if(this.state.loading || this.state.nextPage === -1) {
            return false;
        }
        this.setState({ loading: true });
        api({ url: `/posts/${this.props.params.postId}/comments?_page=${this.state.nextPage}&_limit=${PAGE_LIMIT}`})
        .then((comments) => {
            this.setState((prevState) => ({
                comments: [...prevState.comments, ...comments],
                nextPage: comments.length ? prevState.nextPage + 1 : -1,
                loading: false,
            }));
        }, () => {
            this.setState({ loading: false });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onPageScroll);
    }
    render() {
        return (
            <div>
                <span className="center-header"> Comments</span>
                { this.state.comments.map((comment) => <Comment key={comment.id} comment={comment} />) }
                { this.state.loading && <Loading /> }
            </div>
        );
    }
}

export default Comments;