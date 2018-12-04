import React from 'react';

class PostCard extends React.PureComponent {
    onCardClick = (e) => {
        this.props.router.push(`/posts/${this.props.post.id}/`);
    }
    onUsernameClick = (e) => {
        e.stopPropagation();
        this.props.router.push(`/users/${this.props.post.userId}/`);
    }
    render() {
        return(
            <div className="card pointer" onClick={this.onCardClick}>
                <div>
                    <h4 onClick={this.onUsernameClick}>
                        {this.props.post.user.name} <small><i> ({this.props.post.user.email})</i></small>
                    </h4>
                    <hr className="thin-line"/>
                </div>
                <h5>
                    <span >{this.props.post.title} </span>
                </h5>
                <p> {this.props.post.body} </p>
            </div>
        )
    }
}

export default PostCard;