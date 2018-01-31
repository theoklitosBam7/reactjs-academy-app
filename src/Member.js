import React, { Component } from 'react';
import FaShield from 'react-icons/lib/fa/shield';

class Member extends Component {
  componentWillMount() {
    this.style = {
      backgroundColor: 'gray',
    };
  }

  componentWillUpdate(nextProps) {
    this.style = {
      backgroundColor: (nextProps.admin)
        ? 'green'
        : 'purple',
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.admin !== nextProps.admin;
  }

  render() {
    const {
      name,
      thumbnail,
      email,
      admin,
      makeAdmin,
      removeAdmin,
    } = this.props;
    return (
      <div className="member" style={this.style}>
        <h1>{name} {(admin)
            ? <FaShield />
            : null}
        </h1>
        <img src={thumbnail} alt="profile picture" />
        <br />
        {(admin)
          ? <a onClick={() => removeAdmin(email)}><button>Remove Admin</button></a>
          : <a onClick={() => makeAdmin(email)}><button>Make Admin</button></a>
        }
        <p>
          <a href={`mailto:${email}`}>{email}</a>
        </p>

      </div>
    );
  }
}

export default Member;
