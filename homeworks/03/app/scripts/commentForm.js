import React from 'react'; 
import '../css/base.css';

// This is the comment Form
module.exports = React.createClass({
    getInitialState: function() {
      return {author: '', text: ''};
    },
    handleAuthorChange: function(e) {
      this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
      this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
      e.preventDefault();
      var firstName = this.state.firstName.trim();
      var lastName = this.state.lastName.trim();
      var startDate = this.state.startDate.trim();
      var id = this.state.id.trim();
      if (!firstName || !lastName || !startDate || !id) {
        return;
      }
      this.props.onCommentSubmit({firstName: firstName, lastName: lastName, startDate: startDate, id: id});
      this.setState({firstName: '', lastName: '', startDate: '', id: ''});
    },
    render: function() {
      return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleAuthorChange}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleAuthorChange}
          />

          <input
            type="text"
            placeholder="Start Date:"
            value={this.state.startDate}
            onChange={this.handleTextChange}
          />

          <input
            type="text"
            placeholder="ID"
            value={this.state.id}
            onChange={this.handleTextChange}
          />

          <input type="submit" value="Post" />
        </form>
      );
    }
});
