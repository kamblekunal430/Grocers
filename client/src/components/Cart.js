import { Component, Fragment } from "react";
import AppNavbar from "./AppNavbar";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Alert,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCartItems, deleteItem } from "../actions/cartActions";
//import PostOrder from "./PostOrder";
import { postOrder } from "../actions/orderActions";

class Cart extends Component {
  state = {
    loaded: false,
  };

  static propTypes = {
    getCartItems: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    postCartItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    postOrder: PropTypes.func.isRequired,
  };

  onGetCartItems = async (id) => {
    await this.props.getCartItems(id);
    this.state.loaded = true;
  };

  onDeleteFromCart = (id, itemId) => {
    this.props.deleteItem(id, itemId);
  };

  render() {
    const user = this.props.user;
    if (
      this.props.isAuthenticated &&
      !this.props.cart.loading &&
      !this.state.loaded
    ) {
      this.onGetCartItems(user._id);
    }
    return (
      <div>
        <AppNavbar />
        {this.props.isAuthenticated ? (
          <Fragment>
            {this.props.cart.cart ? null : (
              <Alert color="info" className="text-center">
                Your cart is empty!
              </Alert>
            )}
          </Fragment>
        ) : (
          <Alert color="danger" className="text-center">
            Login to View!
          </Alert>
        )}

        {this.props.isAuthenticated &&
        !this.props.cart.loading &&
        this.state.loaded &&
        this.props.cart.cart ? (
          <Container>
            <div className="row">
              {this.props.cart.cart.items.map((item) => (
                <div className="col-md-4">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">{item.name}</CardTitle>
                      <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                      <CardText>Quantity - {item.quantity}</CardText>
                      <Button
                        color="danger"
                        onClick={this.onDeleteFromCart.bind(
                          this,
                          user._id,
                          item.itemId
                        )}
                      >
                        Delete
                      </Button>
                    </CardBody>
                  </Card>
                  <br />
                </div>
              ))}
              <div class="col-md-12">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      Total Cost = Rs. {this.props.cart.cart.bill}
                    </CardTitle>
                    {/* <PostOrder
                      user={user._id}
                      amount={this.props.cart.cart.bill}
                      postOrder={this.props.postOrder}
                    /> */}
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getCartItems,
  deleteItem,
  postOrder,
})(Cart);
