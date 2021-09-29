import { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateItem } from "../actions/itemActions";

class UpdateItem extends Component {
  state = {
    modal: false,
    name: "",
    details: "",
    category: "",
    price: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    updateItem: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      name: this.props.item.name,
      details: this.props.item.details,
      category: this.props.item.category,
      price: this.props.item.price,
    });
  };

  onChange = (event) => {
    console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = async (event) => {
    const { name, details, category, price } = this.state;

    //create item objtect
    const data = { name, details, category, price };

    await this.props.updateItem(this.props.item._id, data);
  };

  render() {
    return (
      <div className="container p-0">
        {/* {console.log(this.props.item)} */}
        <Button
          color="info"
          className="btn btn-sm text-dark"
          onClick={this.toggle}
          href="#"
        >
          <b>Update Item</b>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={this.state.name || ""}
                  onChange={this.onChange}
                />
                <br />
                <Label for="details">Details</Label>
                <Input
                  type="text"
                  name="details"
                  id="details"
                  placeholder={this.state.details || ""}
                  onChange={this.onChange}
                />
                <br />
                <Label for="category">Category</Label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  placeholder={this.state.category || ""}
                  onChange={this.onChange}
                ></Input>
                <br />
                <Label for="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder={this.state.price || ""}
                  onChange={this.onChange}
                />
                <Button color="success" style={{ marginTop: "2rem" }} block>
                  Update
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { updateItem })(UpdateItem);
