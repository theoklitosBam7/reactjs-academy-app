import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Member from './Member';

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      loading: false,
      administrators: [],
    };

    this.makeAdmin = this.makeAdmin.bind(this);
    this.removeAdmin = this.removeAdmin.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch('https://randomuser.me/api/?results=25&nat=us,dk,fr,gb')
      .then(response => response.json())
      .then(json => json.results)
      .then(members => this.setState({ members, loading: false }));
  }

  componentWillUpdate(nextProps) {
    this.style = {
      backgroundColor: (nextProps.admin)
        ? 'green'
        : 'purple',
    };
  }

  componentDidUpdate(prevProps) {
    console.log(`${prevProps.name} updated`, prevProps.admin, this.props.admin);
  }

  makeAdmin(email) {
    const administrators = [
      ...this.state.administrators,
      email,
    ];
    this.setState({ administrators });
  }

  removeAdmin(email) {
    const administrators = this
      .state
      .administrators
      .filter(adminEmail => adminEmail !== email);
    this.setState({ administrators });
  }

  render() {
    const { administrators, members, loading } = this.state;
    return (
      <div className="member-list">
        <h1>Society Members</h1>

        {(loading)
          ? <span>loading...</span>
          : <span>{members.length} Members</span>
}

        {(members.length)
          ? members.map((member, i) => (<Member
            key={i}
            admin={administrators.some(adminEmail => adminEmail === member.email)}
            name={`${member.name.first} ${member.name.last}`}
            email={member.email}
            thumbnail={member.picture.thumbnail}
            makeAdmin={this.makeAdmin}
            removeAdmin={this.removeAdmin}
          />))
          : <span>Currently 0 Members</span>
}
      </div>
    );
  }
}

export default MemberList;
