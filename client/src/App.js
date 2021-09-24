import { Component } from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import store from "./store";
import { loadUser } from "./actions/authActions";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Home />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
