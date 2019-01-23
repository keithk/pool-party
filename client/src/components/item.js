import React from "react";

import Link from "react-router-dom";

import {
  RIEToggle,
  RIEInput,
  RIETextArea,
  RIENumber,
  RIETags,
  RIESelect
} from "riek";

import TagsInput from "react-tagsinput";

// Our actions

import { updateItem } from "../lib/update-items";

import deleteItem from "../lib/delete-item";

const Image = props => {
  const { url, onClick } = props;

  return (
    <img
      src={`https://s3.amazonaws.com/jabber-wocky/${url}`}
      onClick={onClick}
      className=""
    />
  );
};

export default class Item extends React.Component {
  static defaultProps = { item: {} };

  constructor(props) {
    super(props);

    this.state = props.item;
  }

  delete = () => {
    // we want to delete this item

    const id = this.state.id;

    const remove = deleteItem(id).then(res => {
      this.setState({ deleted: true });
    });
  };

  updateName = async item => {
    await this.setState({ ...item });

    // Here is where we'll go ahead and update the name via API

    await updateItem(this.state);
  };

  handleTagsChange = async tags => {
    await this.setState({ tags });

    await updateItem(this.state);
  };

  toggleClick() {
    const toggle = this.state.clicked ? false : true;

    this.setState({ clicked: toggle });
  }

  render() {
    const item = this.state;

    // Figure out a better way to handle this

    if (item.deleted == true) return <div />;

    return (
      <div>
        {!this.state.clicked && (
          <Image url={item.url} onClick={() => this.toggleClick()} />
        )}

        {this.state.clicked && (
          <div className="m-4">
            <TagsInput
              value={this.state.tags}
              onChange={this.handleTagsChange}
            />

            <button
              className="btn btn-sm m-2"
              onClick={() => this.toggleClick()}
            >
              Close
            </button>

            <button className="btn btn-danger btn-sm m-2" onClick={this.delete}>
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}
