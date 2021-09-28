import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
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
import AppNavbar from "./AppNavbar";
import { getCartItems, deleteFromCart } from "../actions/cartActions";
import { postOrder } from "../actions/orderActions";

class Cart extends Component {
  state = {
    loaded: false,
    result: null,
  };

  static propTypes = {
    getCartItems: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    deleteFromCart: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    postOrder: PropTypes.func.isRequired,
  };

  onGetCartItems = async (id) => {
    await this.props.getCartItems(id);
    this.state.loaded = true;
  };

  onPostOrder = async (id, payment) => {
    this.props.postOrder(id, payment);
    window.alert("ORDER SUCCESSFULL");
  };
  onDeleteFromCart = async (id, itemId) => {
    await this.props.deleteFromCart(id, itemId);
  };

  render() {
    const user = this.props.user;
    const cart = this.props.cart.cart;
    //console.log("render", cart);
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
            {cart && cart.items.length > 0 ? null : (
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
        cart ? (
          <Container>
            <div className="row">
              {cart.items.map((item) => (
                <div className="col-md-4">
                  <Card style={{ backgroundColor: "lightgrey" }}>
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
                        Remove
                      </Button>
                    </CardBody>
                  </Card>
                  <br />
                </div>
              ))}
              {cart.items.length > 0 ? (
                <div className="col-md-12">
                  <Card
                    className="text-center"
                    style={{
                      backgroundColor: "lightskyblue",
                    }}
                  >
                    <CardBody>
                      <CardTitle tag="h5" style={{ lineHeight: "50px" }}>
                        TOTAL COST = Rs. {cart.bill}
                      </CardTitle>
                      <Link to="/orders">
                        <Button
                          color="success"
                          onClick={this.onPostOrder.bind(this, user._id, {
                            success: true,
                          })}
                        >
                          Buy Now
                        </Button>
                      </Link>
                    </CardBody>
                  </Card>
                </div>
              ) : (
                ""
              )}
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
  deleteFromCart,
  postOrder,
})(Cart);
