import React from "react";
import ReactDOM from "react-dom";

class Topic extends React.Component
{
    render()
    {
        return (<h1> display_text: {this.props.display_text} </h1>);
    }
}

export default Topic;