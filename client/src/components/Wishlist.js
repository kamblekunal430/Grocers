import { Component, Fragment } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  Button,
  Alert,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppNavbar from "./AppNavbar";
import {
  getWishlistItems,
  deleteWishlistItem,
} from "../actions/wishlistActions";
import { postCartItem } from "../actions/cartActions";

class Wishlist extends Component {
  state = {
    loaded: false,
    result: null,
  };

  static propTypes = {
    getWishlistItems: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    deleteWishlistItem: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    wishlist: PropTypes.object.isRequired,
    postCartItem: PropTypes.func.isRequired,
  };

  onGetWishlistItems = async (id) => {
    await this.props.getWishlistItems(id);
    this.state.loaded = true;
  };

  onPostCartItem = async (userId, itemId) => {
    this.props.postCartItem(userId, itemId, 1);
    window.alert("Item Added to Cart");
  };
  OnDeleteWishlistItem = async (id, itemId) => {
    await this.props.deleteWishlistItem(id, itemId);
  };

  render() {
    const user = this.props.user;
    const wishlist = this.props.wishlist.wishlist;
    //console.log("render", cart);
    if (
      this.props.isAuthenticated &&
      !this.props.wishlist.loading &&
      !this.state.loaded
    ) {
      this.onGetWishlistItems(user._id);
    }
    return (
      <div>
        <AppNavbar />
        {this.props.isAuthenticated ? (
          <Fragment>
            {wishlist && wishlist.items.length > 0 ? null : (
              <Alert color="info" className="text-center">
                Your Wishlist is empty!
              </Alert>
            )}
          </Fragment>
        ) : (
          <Alert color="danger" className="text-center">
            Login to View!
          </Alert>
        )}

        {this.props.isAuthenticated &&
        !this.props.wishlist.loading &&
        this.state.loaded &&
        wishlist ? (
          <Container>
            <div className="row">
              {wishlist.items.map((item) => (
                <div className="col-md-3">
                  <Card style={{ backgroundColor: "#d4f1f4" }}>
                    <CardImg
                      top
                      width="100%"
                      style={{ height: "300px", padding: "5px" }}
                      src={item.image}
                    />
                    <CardBody>
                      <CardTitle tag="h5">{item.name}</CardTitle>
                      <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                      <Button
                        className="mx-3 mt-3"
                        color="danger"
                        onClick={this.OnDeleteWishlistItem.bind(
                          this,
                          user._id,
                          item.itemId
                        )}
                      >
                        Remove from Wishlist
                      </Button>
                      <Button
                        className="mx-3 mt-3"
                        color="success"
                        onClick={this.onPostCartItem.bind(
                          this,
                          user._id,
                          item.itemId
                        )}
                      >
                        Add to Cart
                      </Button>
                    </CardBody>
                  </Card>
                  <br />
                </div>
              ))}
            </div>
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wishlist: state.wishlist,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getWishlistItems,
  deleteWishlistItem,
  postCartItem,
})(Wishlist);
