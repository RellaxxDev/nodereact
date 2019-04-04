import React, { Component } from "react";

import '../styles/App.css';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Autocomplete Input</h1>
                <div className="wrapper">
                    <input id="autocompleteInput" type="text" placeholder="Country" />
                </div>
            </div>
        );
    }
}

export default App;