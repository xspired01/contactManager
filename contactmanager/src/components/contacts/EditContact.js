import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getContact, updateContact } from "../../actions/contactActions";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    company: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone, company } = nextProps.contact;
    this.setState({
      name,
      email,
      phone,
      company
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

  onSubmit = e => {
    e.preventDefault();
    const { name, email, phone, company } = this.state;
    const { id } = this.props.match.params;

    //error check for name
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    //error check for email
    if (email === "") {
      this.setState({ errors: { name: "Email is required" } });
      return;
    }
    //error check for phone
    if (phone === "") {
      this.setState({ errors: { name: "Phone is required" } });
      return;
    }
    //error check for company
    if (company === "") {
      this.setState({ errors: { name: "Company is required" } });
      return;
    }

    const updContact = {
      id,
      name,
      email,
      phone,
      company
    };

    this.props.updateContact(updContact);

    //clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      company: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, company } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
            />
            <TextInputGroup
              label="Company"
              name="company"
              placeholder="Enter Company"
              value={company}
              onChange={this.onChange}
            />
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact.contact
});

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EditContact);
