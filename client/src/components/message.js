import React from "react";

const message = props => {
  const { title, body } = props;

  return (
    <article className="message is-danger">
      <div className="message-header">
        <p>{title}</p>
      </div>

      <div className="message-body">{body}</div>
    </article>
  );
};

export default message;
