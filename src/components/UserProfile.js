import React from 'react';

import api from '../utils/api';
import Loading from './Loading';
import Posts from './Posts';

const ProfileCard = React.memo(({ user }) => (
    <div className="comment-card text-center">
        <h2> {user.name} </h2>
        <h4> {user.username} </h4>
        <i> {user.email} </i>
        <p><a href={`${user.website}`}> {user.website}</a></p>
        <p>
            Company name: {user.company.name}
        </p>
    </div>
));

class UserProfile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { user : null, showPosts: false, loading: true }; 
    }
    componentDidMount() {
        this.fetchUser();
    }
    fetchUser = () => {
        api({ url: `/users/${this.props.params.userId}`})
        .then((user) => { this.setState({ user, loading: false})
        },() => { this.setState({ loading: false})})
    }
    onHandleClick = () => {
        this.setState((prevState) => ({ showPosts: !prevState.showPosts}));
    }
    render() {
        if(this.state.loading) {
            return <Loading />
        }
        if(!this.state.user) {
            return <div className="center-header">  User not found</div>
        }
        return(
            <div>
                <ProfileCard user={this.state.user}/>
                <button onClick={this.onHandleClick}>
                    {this.props.showPosts ? 'Hide Posts' : 'Show Posts'}
                </button>
                <hr />
                {
                    this.state.showPosts &&
                        <Posts {...this.props}/>
                }
            </div>
        )
    }
}

export default UserProfile;