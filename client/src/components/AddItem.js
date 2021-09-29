import { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { postItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import AppNavbar from "./AppNavbar";
import { Redirect } from "react-router-dom";

class AddItem extends Component {
  state = {
    name: "",
    details: "",
    category: "",
    price: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      details: this.state.details,
      category: this.state.category,
      price: this.state.price,
    };

    await this.props.postItem(newItem);

    alert("Item added successfully");
  };

  render() {
    return (
      <div>
        <AppNavbar />
        <Container>
          {/* {console.log("user", this.props.user)} */}
          <h2 className="text-center mb-3">Add a Item</h2>
          {this.props.isAuthenticated ? (
            this.props.user.isAdmin ? (
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name of the item"
                    onChange={this.onChange}
                  />
                  <br />
                  <Label for="details">Details</Label>
                  <Input
                    type="text"
                    name="details"
                    id="details"
                    placeholder="Details of the item"
                    onChange={this.onChange}
                  />
                  <br />
                  <Label for="category">Category</Label>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Category of the item"
                    onChange={this.onChange}
                  ></Input>
                  <br />
                  <Label for="price">Price</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price of the item"
                    onChange={this.onChange}
                  />

                  <Button color="info" style={{ marginTop: "2rem" }} block>
                    <b>Add Item</b>
                  </Button>
                </FormGroup>
              </Form>
            ) : (
              <Redirect to="/" />
            )
          ) : (
            <Alert className="text-center" color="danger">
              Login to add items!
            </Alert>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { postItem })(AddItem);
