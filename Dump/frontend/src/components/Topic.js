import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import "babel-polyfill";

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
            text : "",
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
        this.setState({text: event.target.value});
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
            topic_text: this.state.text,
            is_acronym: this.state.isAcronym,
            oneliner_set: [],
            acronym: {},
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
                        <input type="text" value={this.state.text} onChange={this.onTextChange} />
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

export {Topic, TopicForm};