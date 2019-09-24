import React from "react";
import ReactDOM from "react-dom";
import ReactSortable from "react-sortablejs";
import uniqueId from 'lodash/uniqueId';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Topic from './Topic';
import Cookies from 'js-cookie';

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
        display:true,
        topics:[],
    }
  }

  getTopics()
  {
    console.log('getTopics - fetch');

    fetch(this.props.endpoint)
        .then(res => res.json())
        .then((data) => {
          this.setState({ topics: data})
        })
        .catch(console.log);
  }

  componentDidMount()
  {
    console.log('componentDidMount');
    this.getTopics();
  }

  redirectTopic({match})
  {
    return (
        <Topic endpoint={`/topics/serialize/${match.params.id}`} />
    );
  }

  deleteTopic(id)
  {
        console.log('deleteTopic');

        var csrftoken = Cookies.get('csrftoken');

        // TODO: how to make requests with '/' at the end synonymous with non-suffixed '/'
        fetch("topics/serialize/"+id+"/", {method:"DELETE", headers:{'X-CSRFToken': csrftoken}}).catch(console.log);
        this.getTopics();

  }

  editTopic()
  {

  }

  renderTopics()
  {
    console.log('renderTopics');
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
                    <button onClick={() => this.editTopic()}> Edit </button>
                    <button onClick={() => this.deleteTopic(topic.id)}> Delete </button>
                </li>

                    );
        },this)


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
    console.log('render');

    return (
    <div>
        <p> {this.props.endpoint} </p>

        <button onClick={() => this.handleClick()}>
            Toggle Display
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