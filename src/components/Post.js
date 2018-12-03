import React from 'react';

class Post extends React.Component {
    render() {
        return(
            <div className="card">
                <h4>{this.props.post.title}</h4>
                <p> {this.props.post.body} </p>
            </div>
        )
    }
}

export default Post;