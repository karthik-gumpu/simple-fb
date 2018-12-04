import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';

import api from '../utils/api';
import Loading from './Loading';
import { storeComments, storeMoreComments } from './../actions';

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

        // Fetch more comments when scroll reaches to the bottom of page
        if($(window).scrollTop() + $(window).height() === $(document).height()) {
            this.fetchComments(true);
        }
    }
    fetchComments = (isFetchingMore) => {

        // Don't fetch posts if previous request is still in-progress
        // or when there are no more records (then nextPage is -1)
        if(this.state.loading || this.state.nextPage === -1) {
            return false;
        }

        this.setState({ loading: true });

        this.fetchingComments = api({ url: `/posts/${this.props.params.postId}/comments?_page=${this.state.nextPage}&_limit=${PAGE_LIMIT}`})
        .then((comments) => {
            if(isFetchingMore) {
                this.props.storeMoreComments(comments);
            } else {
                this.props.storeComments(comments);
            }
            this.setState((prevState) => ({
                nextPage: comments.length ? prevState.nextPage + 1 : -1,
                loading: false,
            }));
        }, () => {
            this.setState({ loading: false });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onPageScroll);
        
        // Cancel pending request
        if(this.fetchingComments) {
            this.fetchingComments.cancel();
        }
    }
    render() {
        return (
            <div>
                <span className="center-header"> Comments</span>
                { this.props.comments.map((comment) => <Comment key={comment.id} comment={comment} />) }
                { this.state.loading && <Loading /> }
            </div>
        );
    }
}

const mapStateToProps = ({ comments }) => ({
    comments,
})
export default connect(
    mapStateToProps,
    { storeComments, storeMoreComments },
)(Comments);