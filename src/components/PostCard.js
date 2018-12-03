import React from 'react';
import { Link } from 'react-router';

class PostCard extends React.Component {
    render() {
        return(
            <Link
                className="card"
                to={`/posts/${this.props.post.id}/`}
            >
                    <Link
                        to={`/users/${this.props.post.userId}/`}
                    >
                        <h4>{this.props.post.title}</h4>
                    </Link>
                <p> {this.props.post.body} </p>
            </Link>
        )
    }
}

export default PostCard;