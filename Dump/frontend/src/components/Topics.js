import React from "react";
import ReactDOM from "react-dom";
import ReactSortable from "react-sortablejs";
import uniqueId from 'lodash/uniqueId';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Topic from './Topic';

function GetTopic({match})
  {
    return (
        <Topic endpoint={`/topics/serialize/${match.params.id}`} />
    );
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

  redirectTopic({match})
  {
    return (
        <Topic endpoint={`/topics/serialize/${match.params.id}`} />
    );
  }


  renderTopics()
  {
    const topics = this.state.topics.map(
        function (topic) {
            return (
                <li key={uniqueId()} className="topicBlob" >
                    <Router>
                        <a href={`topics/${topic.id}/`}>
                            { topic.topic_text }{ JSON.parse(topic.is_acronym) ? ` - ${topic.acronym.acronym_expanded}` : ""}
                        </a>
                        <Route path={`/${topic.id}/`} render={
                                                    (props) => redirectTopic(props.match)
                                                    } />
                    </Router>
                </li>

                    );
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
        <p> {this.props.endpoint} </p>

        <button onClick={() => this.handleClick()}>
            Toggle Display button
        </button>

      <h1> topics </h1>
      <div>
      {this.renderTopics()}
      </div>

    </div>
    );

  }
}

export default Topics;