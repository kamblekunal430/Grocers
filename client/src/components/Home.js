import { Component } from "react";
import AppNavbar from "./AppNavbar";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardImg,
  CardSubtitle,
  Button,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { postCartItem } from "../actions/cartActions";

class Home extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    postCartItem: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  onAddToCart = async (id, itemId) => {
    await this.props.postCartItem(id, itemId, 1);
    alert("Item added to Cart");
  };

  onDeleteItem = async (itemId) => {
    var res = window.confirm("Confirm Delete Item");
    if (res) {
      await this.props.deleteItem(itemId);
    }
  };

  render() {
    const { items } = this.props.item;
    const user = this.props.user;
    return (
      <div>
        <AppNavbar />
        <Container>
          <div className="row">
            {items.map((item) => (
              <div className="col-md-3">
                <Card className="mb-4" style={{ backgroundColor: "lightgrey" }}>
                  <CardBody>
                    <CardImg
                      top
                      width="100%"
                      src="http://hdwpro.com/wp-content/uploads/2015/12/nature-hd-image-1229x768.jpg"
                    />
                    <br />
                    <br />
                    <CardTitle tag="h5">{item.name}</CardTitle>
                    <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                    <CardText>{item.category}</CardText>
                    {this.props.isAuthenticated ? (
                      this.props.user.isAdmin ? (
                        <Button
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteItem.bind(this, item._id)}
                        >
                          Delete Item
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          size="sm"
                          onClick={this.onAddToCart.bind(
                            this,
                            user._id,
                            item._id
                          )}
                        >
                          Add To Cart
                        </Button>
                      )
                    ) : null}
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
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

export default connect(mapStateToProps, { getItems, postCartItem, deleteItem })(
  Home
);
