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
    image: "",
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
      image: this.props.item.image,
    });
  };

  onChange = (event) => {
    // console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleReaderLoaded = (readerEvent) => {
    let imgStr = readerEvent.target.result;
    console.log(imgStr);
    this.setState({
      image: imgStr,
    });
  };

  onImgUpload = (e) => {
    let file = e.target.files[0];
    console.log("file to upload", file);

    // if file exist convert into base64 string
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  };

  onSubmit = async (event) => {
    const { name, details, category, price, image } = this.state;

    //create item objtect
    const data = { name, details, category, price, image };

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
                <br />
                <Label for="image">Upload Image:</Label>&emsp;&emsp;
                <Input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={this.onImgUpload}
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
