import React from "react";
import ReactDOM from "react-dom";

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

export default Topic;