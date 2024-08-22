import Navbar from "./components/Navbar";
import Overview from "./components/Overview";
import PeopleDirectory from "./components/PeopleDirectory";
import ProfileHeader from "./components/ProfileHeader";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen bg-light_orange">
              <ProfileHeader/>
              <div className="flex flex-1">
                <Navbar/>
                <Outlet/>
              </div>
            </div>
          }
        >
          <Route index element = {<Navigate to = {'/overview'}/>}/>
          <Route path="/overview" element = {<Overview/>} />
          <Route path="/people_directory" element={<PeopleDirectory/>} />
        </Route>

        <Route path="*" element="404 Page Not Found!!" />
      </Routes>
    </Router>
  );
}

export default App;
