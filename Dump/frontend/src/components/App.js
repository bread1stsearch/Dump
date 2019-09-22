import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Topics from './Topics';

class App extends React.Component
{
    render()
    {
        return (
            <Router>
                <div>
                    <ul>
                       <li>
                            <Link to="/home"> Home</Link>
                        </li>
                        <li>
                            <Link to="/list"> Topics</Link>
                        </li>
                    </ul>

                <hr />
                <Route component={Default} />
                <Route path="/home" component={Home} />
                <Route path="/list" component={ListTopics}/>
                </div>
            </Router>
        );
    }
}

function ListTopics({ match }) {
  return (
    <div>
      <Topics endpoint="topics/serialize"/>
    </div>
  );
}

function Home (){
    return (
        <div>
            <h1> HOME </h1>
        </div>
    );
}

function Default()
{
    return (
        <div>
            <h1> DEFAULT</h1>
        </div>
    );
}

//https://tylermcginnis.com/react-router-pass-props-to-components/
const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App />, wrapper) : null;