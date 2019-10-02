import React from "react";
import ReactDOM from "react-dom";
import ReactSortable from "react-sortablejs";
import uniqueId from 'lodash/uniqueId';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
//import {Topic, TopicForm} from './Topic';
import Cookies from 'js-cookie';
import 'babel-polyfill';

class Topic extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { attributes: [] };
    }

    componentDidMount()
    {
        fetch(this.props.endpoint)
        .then(response => response.json)
        .then(data => this.setState({attributes:data}))
        .catch(console.log);
    }

    render()
    {
        return (
            <h1> topic text: {this.state.attributes.topic_text} </h1>
        );
    }
}

class TopicForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            topic_text : "",
            isAcronym : false,
            acronymExpanded : "",
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.onIsAcronymChange = this.onIsAcronymChange.bind(this);
        this.onAcronymExpandedTextChange = this.onAcronymExpandedTextChange.bind(this);
        this.addTopic = this.addTopic.bind(this);
    }

    onTextChange(event)
    {
        console.log("TopicForm onTextChange");
        this.setState({topic_text: event.target.value});
    }

    onIsAcronymChange(event)
    {
        console.log("TopicForm onIsAcronymChange");
        this.setState({isAcronym : event.target.checked});
    }

    onAcronymExpandedTextChange(event)
    {
        console.log("topicForm onAcronymExpandedTextChange");
        this.setState({acronymExpanded : event.target.value});
    }

    async addTopic(event)
    {
        console.log("addTopic");

        var csrftoken = Cookies.get('csrftoken');

        var topic = {
            topic_text: this.state.topic_text,
            is_acronym: this.state.isAcronym,
            acronym_expanded : this.state.acronymExpanded,
            oneliner_set: []
        };

        await fetch(this.props.endpoint,
            {
                method : "POST",
                body : JSON.stringify(topic),
                headers : {
                    "X-CSRFToken" : csrftoken,
                    "Accept-Encoding" : "gzip, deflate",
                    "Content-Type" : "application/json",
                    }
        }).then(console.log("finished POST topic"))
        .catch(console.log);
    }

    render()
    {
        const isAcronym = this.state.isAcronym;
        let acronymExpandedTextInput;

        if (isAcronym)
        {
            acronymExpandedTextInput = (
                <input type="text" value={this.state.acronymExpanded} onChange={this.onAcronymExpandedTextChange} />
            );
        }
        return (
            <div>
                <form onSubmit={this.addTopic} >
                    <label>
                        Topic:
                        <input type="text" value={this.state.topic_text} onChange={this.onTextChange} />
                    </label>
                    <br/>
                    <label>
                        Acronym:
                        <input type="checkbox" checked={this.state.isAcronym} onChange={this.onIsAcronymChange} />
                        {acronymExpandedTextInput}
                    </label>
                    <input type="submit" value="Add Topic"/>
                </form>
            </div>
        );
    }
}

class Topics extends React.Component {
  constructor(props)
  {
	super(props);
	this.state =
	{
		display:true,
		topics:[],
		newTopicText:"",
	}
  }

  componentDidUpdate(prevState)
  {
	console.log("componentDidUpdate");
	if (prevState.topics != this.state.topics)
	{
		console.log("topic has updated");
	}
  }

  getTopics()
  {
	console.log('getTopics');

	fetch(this.props.endpoint)
		.then(res => res.json())
		.then((data) => {
		  this.setState({ topics: data }, () => {
		  console.log("SET STATE FOR TOPIC AFTER GET" + JSON.stringify(this.state.topics))
		  })
		})
		.catch(console.log);
	//this.forceUpdate();
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

  async deleteTopic(id)
  {
		console.log('deleteTopic');

		var csrftoken = Cookies.get('csrftoken');

		// TODO: how to make requests with '/' at the end synonymous with non-suffixed '/'
		await fetch("topics/serialize/"+id+"/", {method:"DELETE", headers:{'X-CSRFToken': csrftoken}}).catch(console.log);
		this.getTopics();
  }

  editTopic()
  {
	return (<div><h1> edit </h1></div>);
  }

  handleClick()
  {
    this.setState({display:!this.state.display});
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
  }

  render() {
	console.log('render');

	return (
	<div>
		<p> {this.props.endpoint} </p>

		<button onClick={() => this.handleClick()}>
			Toggle Display
		</button>

	  <h1> Topics </h1>
	  <p> {JSON.stringify(this.state.topics)} </p>
	  <div>
	  {this.renderTopics()}
	  </div>

      <h1> Add Topic </h1>
      <div>
        <TopicForm endpoint={this.props.endpoint}/>
      </div>
	</div>
	);

  }
}

export default Topics;