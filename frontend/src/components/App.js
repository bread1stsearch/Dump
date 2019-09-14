import React from "react";
import ReactDOM from "react-dom";

class Topic extends React.Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
        topic:"nodata",
    }
  }

  componentDidMount()
  {
    fetch(this.props.endpoint)
        .then(res => res.json())
        .then((data) => {
          this.setState({ topic: JSON.stringify(data) })
        })
        .catch(console.log)
  }

  render() {
    return (
    <div>
        <h1> {this.props.endpoint} </h1>

        <button className="square">
            {this.state.topic}
        </button>

      <p> {this.state.topic} </p>
      </div>
    );

  }
}

const App = () => (
  <Topic endpoint="topics/serialize/"
    value="dV A LUE"/>
);
const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App />, wrapper) : null;