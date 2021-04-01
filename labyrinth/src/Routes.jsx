import React from "react";
import { Route, Switch } from "react-router-dom";
import { Welcome } from "./containers/Welcome";
import { ModeSelection } from "./containers/ModeSelection";
import LabyrinthGame from "./containers/LabyrinthGame";
import Guide from "./containers/Guide";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Welcome />
            </Route>
            <Route exact path="/game">
                <ModeSelection />
            </Route>
            <Route exact path="/game/:gameMode">
                <LabyrinthGame />
            </Route>
            <Route exact path="/guide">
                <Guide />
            </Route>
            {/* Finally, catch all unmatched routes */}
            <Route>
                <Welcome />
            </Route>
        </Switch>
    );
}
