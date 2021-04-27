import React from "react";
import Header from "./notes/Nav";
import Home from "./notes/Home";
import CreateNote from "./notes/CreateNote";
import EditNote from "./notes/EditNote";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Note = ({ setIsLogin }) => {
  return (
    <Router>
      <div className="notes-page">
        <Header setIsLogin={setIsLogin} />
        <section>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={CreateNote} />
          <Route exact path="/edit/:id" component={EditNote} />
        </section>
      </div>
    </Router>
  );
};

export default Note;
