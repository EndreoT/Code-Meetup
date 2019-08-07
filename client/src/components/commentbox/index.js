import React from 'react';
import API from '../../utils/API';
import { connect } from 'react-redux';
import LoginModal from '../LoginModal';
import './style.css';

const mapStateToProps = (state) => {
  return {
    id: state.authState.id,
    first_name: state.authState.first_name,
    last_name: state.authState.last_name,
    email: state.authState.email,
    token: state.authState.token,
  };
}


class CommentBox extends React.Component {

  state = {
    showComments: true,
    comments: [],
    body: '',
    title: ""
  }


  componentDidMount() {
    this.getComments()
  }

  //Function grabs all comments for specific event 
  getComments = () => {
    API.findCommentsForEventId(this.props.eventId)
      .then(res => {
        this.setState({
          comments: res.data
        })

      })
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  //Function to add/create comment on page and also creating/updating comments in DB
  _addComment = () => {
    const { body } = this.state
    const comment = {
      event: this.props.eventId,
      creator: this.props.id,
      body
    };

    API.createComment(comment)
      .then(res => {
        // *new array references help React stay fast, so concat works better than push here.  
        this.setState({ comments: this.state.comments.concat([res.data]), body: ''}) 
      })
      .catch(err => console.log(err.response));
  }

  //Click function for show comments button
  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  // Function to delete user comments
  _deleteComment = (commentId) => {

    API.deleteCommentById(commentId)
      .then(res => {
        const updatedEventComments = this.state.comments.filter(comments => {
          return comments._id !== res.data._id
        })
        this.setState({ comments: updatedEventComments })
      })
      .catch(err => console.log(err));
  }

  //Returns a list of comments with speicif parameters
  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <div
          key={comment._id}>
          <Comment
            creator={comment.creator.first_name + " " + comment.creator.last_name}
            body={comment.body}
            key={comment._id}
          />
          <div>
            {
              this.props.first_name + " " + this.props.last_name === comment.creator.first_name + " " + comment.creator.last_name
                ?
                <button className="comment-footer-delete" onClick={() => this._deleteComment(comment._id)}>❌</button>
                :
                <div></div>
            }
          </div>
        </div>
      );
    });
  }

  //Returns the user the number of comments in event
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show comments';

    if (this.state.showComments) {
      buttonText = 'Hide comments';
      commentNodes = <div className="comment-list">
        {comments}
      </div>;
    }

    return (
      <div className="comment-box">
        {
          this.props.first_name ?
            <div>
              <h2 style={{ marginTop: '3rem' }}>Join the Discussion!</h2>
              <textarea rows="6" style={{ paddingLeft: '.25rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8', width: '25rem' }} name="body" value={this.state.body} onChange={this.handleChange} />
              <br></br>
              <button id="submitComment" onClick={this._addComment} style={{ width: '4rem', marginTop: '.5rem', marginBottom: '.75rem' }}>
                Submit
              </button>
            </div>
            :
            <div>
              <h2>Please Sign in to join the discussion</h2>
              <br></br>
              <LoginModal />
            </div>
        }

        <button style={{ width: '8rem' }} className="comment-reveal" onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>
        <h3 style={{ marginTop: '1rem' }}>Comments</h3>
        <h4 style={{ marginBottom: '5rem' }} className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        {commentNodes}
      </div>
    );
  }
}


class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.creator}</p>
        <p className="comment-body">- {this.props.body}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CommentBox);
