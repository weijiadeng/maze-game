import React from "react";
import { Route, Switch } from "react-router-dom";
import { Welcome } from "./components/Welcome";
import { ModeSelection } from "./components/ModeSelection";
import LabyrinthGame from "./components/LabyrinthGame";
import Guide from "./components/Guide";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/labyrinth">
                <Welcome />
            </Route>
            <Route exact path="/labyrinth/mode">
                <ModeSelection />
            </Route>
            <Route exact path="/labyrinth/game/:gameMode">
                <LabyrinthGame />
            </Route>
            <Route exact path="/labyrinth/guide">
                <Guide />
            </Route>
            {/* Finally, catch all unmatched routes */}
            <Route>
                <Welcome />
            </Route>
        </Switch>
    );
}
