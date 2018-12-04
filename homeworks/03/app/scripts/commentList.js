
import React from 'react';
import '../css/base.css';

import Comment from './comment.js';

// This is the comment list
module.exports = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function(comment) {
        return (
          <Comment author={"Person ID: " + comment.id + ", " + "Name:" + comment.firstName + " " + comment.lastName} key={comment.id}>
            {"Start Date" + comment.startDate}
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
