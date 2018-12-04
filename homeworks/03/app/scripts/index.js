var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    handleCommentSubmit: function(comment) {
      var comments = this.state.data;
  
      //comment.id = Date.now();
      var newComments = comments.concat([comment]);
      this.setState({data: newComments});
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({data: comments});
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
      return (
        <div className="commentBox">
          <h1>Database Peoples</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
      );
    }
  });

var CommentList = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function(comment) {
        return (
          <Comment author={"Name:  " + comment.firstName + " " + comment.lastName + ",  ID: " + comment.id} key={comment.id}>
            {"Start Date:  " + comment.startDate}
          </Comment>
        );
      });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  });

var Comment = React.createClass({
    rawMarkup: function() {
      var md = new Remarkable();
      var rawMarkup = md.render(this.props.children.toString());
      return { __html: rawMarkup };
    },
  
    render: function() {
      return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      );
    }
  });


  var CommentForm = React.createClass({
    getInitialState: function() {
      return {firstName: '', lastName: '', startDate: '', id: ''};
    },
    handleFirstNameChange: function(e) {
      this.setState({firstName: e.target.value});
    },
    handleLastNameChange: function(e) {
      this.setState({lastName: e.target.value});
    },
    handleStartDateChange: function(e) {
        this.setState({startDate: e.target.value});
    },
    handleIdChange: function(e) {
        this.setState({id: e.target.value});
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
            onChange={this.handleFirstNameChange}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleLastNameChange}
          />

          <input
            type="date"
            placeholder="Start Date:"
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
          />

          <input
            type="number"
            placeholder="ID"
            value={this.state.id}
            onChange={this.handleIdChange}
          />

          <input type="submit" value="Post" />

          <br />

          <label
            id="responseHere"
            />
        </form>
      );
    }
  });

// This renders the virtual dom
ReactDOM.render(
  <CommentBox url="/people" pollInterval={2000} />,
  document.getElementById('content')
);