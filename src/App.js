
import "./App.css";
import HomeAfterLogin from './components/Home/HomeAfterLogin';
import Home from './components/Home/Home';
import CreatePost from './components/CreatePost/CreatePost';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar/NavBar.js';
import CompletePost from "./components/CompletePost/CompletePost"; 
import Badges from "./components/Badges/Badges";
import MyPosts from './components/MyPosts/MyPosts';
import FileUploadPage from './components/CreatePost/FileUploadPage';
function App() {
  
  return(
    <Router>
    
      <NavBar />
      <Switch>
        <Route path="/create" component={CreatePost} />
        <Route path="/badges" component={Badges} />
        <Route path="/completePost/:post" component={CompletePost} />
        <Route path="/home" component={HomeAfterLogin}/>
    {/*    <Route path="/my_posts" component={MyPosts}/> */} 
        <Route path="/" component={Home} >
          </Route>
      </Switch> 
 
    </Router>
    
  
  );
  
}

export default App;

/*    
 
<Sample/>


    
    */