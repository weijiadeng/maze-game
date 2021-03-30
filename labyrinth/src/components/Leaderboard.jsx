import { useSelector } from "react-redux";
import { selectList } from "../reducers/leaderboardSlice";

export function LearderboardSection(props) {
    const leaderList = useSelector(selectList);
    return <div>
        {leaderList.map((item, index) => (<div>{item}</div>))}
    </div>
}