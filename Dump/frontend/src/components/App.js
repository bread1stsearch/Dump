import React from "react";
import ReactDOM from "react-dom";
import ReactSortable from "react-sortablejs";
import uniqueId from 'lodash/uniqueId';

class Topic extends React.Component
{
    render()
    {
        return (<h1> {this.props.display_text} </h1>);
    }
}

class Topics extends React.Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
        display:false,
        topics:[],
    }
  }

  getTopics()
  {
    fetch(this.props.endpoint)
        .then(res => res.json())
        .then((data) => {
          this.setState({ topics: data})
        })
        .catch(console.log);
  }

  componentDidMount()
  {
    this.getTopics();
  }

  renderText()
  {
    if (this.state.display)
    {
        return (<Topic display_text="true"/>);
    }
    else
    {
        return (<Topic display_text="false"/>);
    }
  }

  renderTopicText()
  {
    const topics = this.state.topics.map(
        function (topic) {
            return (<li key={uniqueId()}> { topic.topic_text }{ JSON.parse(topic.is_acronym) ? ` - ${topic.acronym.acronym_expanded}` : ""} </li>);
        })

    if (this.state.display)
    {
        return (
            <div>
                <p> {this.state.topics.length} </p>
                <ReactSortable tag="ul"> {topics} </ReactSortable>
            </div>
        );
    }
    else
    {
        return (<p> No topics </p>);
    }

    /* vs just:
    so weird:
    return (
            <div>
                <p> {this.state.topics.length} </p>
                <ReactSortable tag="ul"> {topics} </ReactSortable>
            </div>
    );*/
  }

  handleClick()
  {
    this.setState({display:!this.state.display});
  }

  render() {
    return (
    <div>
        <h1> {this.props.endpoint} </h1>

        <button onClick={() => this.handleClick()}>
            Toggle Display
        </button>

      <h1> display_text </h1>
      <div>
      {this.renderText()}
      </div>

      <h1> topics </h1>
      <div>
      {this.renderTopicText()}
      </div>
    </div>
    );

  }
}

const App = () => (
  <Topics endpoint="topics/serialize/"
    value="dV A LUE"/>
);
const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App />, wrapper) : null;