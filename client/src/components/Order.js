import { Component, Fragment } from "react";
import AppNavbar from "./AppNavbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOrders } from "../actions/orderActions";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Alert,
  Container,
  CardFooter,
} from "reactstrap";

class Orders extends Component {
  state = {
    loaded: false,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    getOrders: PropTypes.func.isRequired,
  };

  ongetOrders = async (id) => {
    await this.props.getOrders(id);
    this.state.loaded = true;
  };

  render() {
    const user = this.props.user;
    if (
      this.props.isAuthenticated &&
      !this.props.order.loading &&
      !this.state.loaded
    ) {
      this.ongetOrders(user._id);
    }
    return (
      <div>
        <AppNavbar />
        {this.props.isAuthenticated ? (
          <Fragment>
            {/* console.log("insde", this.props.order.orders) */}
            {this.props.order.orders.length !== 0 ? null : (
              <Alert color="info" className="text-center">
                You have no orders!
              </Alert>
            )}
          </Fragment>
        ) : (
          <Alert color="danger" className="text-center">
            Login to View!
          </Alert>
        )}

        {this.props.isAuthenticated &&
        !this.props.order.loading &&
        this.state.loaded &&
        this.props.order.orders.length ? (
          <Container>
            <h2
              className="text-center mb-0"
              style={{ backgroundColor: "#d4f1f4", height: "50px" }}
            >
              Your Orders!
            </h2>
            <div className="row">
              {this.props.order.orders.reverse().map((order) => (
                <div className="col-md-12">
                  <Card
                    style={{
                      backgroundColor: "#d4f1f4",
                    }}
                  >
                    <CardBody>
                      <CardTitle tag="h4">
                        Number of Items - {order.items.length}
                      </CardTitle>
                      <div className="row">
                        {order.items.map((item) => (
                          <div className="col-md-4">
                            <Card>
                              <CardBody
                                style={{
                                  backgroundColor: "#d4f1f4",
                                  border: "gray solid 1px",
                                }}
                              >
                                <CardTitle tag="h5">{item.name}</CardTitle>
                                <CardSubtitle
                                  tag="h6"
                                  style={{ lineHeight: "25px" }}
                                >
                                  QUANTITY: {item.quantity} <br />
                                  Rs. {item.price}/Item <br />
                                  Cost: Rs. {item.quantity * item.price}
                                </CardSubtitle>
                              </CardBody>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                    <CardFooter
                      color="dark"
                      tag="h4"
                      style={{ margin: "5px", backgroundColor: "#77dd77" }}
                    >
                      Total Cost: Rs. {order.bill} &emsp;&emsp; Order Date:{" "}
                      {order.dateAdded.substr(0, 10)}
                    </CardFooter>
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
  order: state.order,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getOrders })(Orders);
