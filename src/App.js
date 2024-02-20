import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContextProvider from "./userContext";
import CreatePost from "./pages/CreatePost";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home"
import Write from "./pages/Write";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import HomeRight from "./components/home/HomeRight";
import TagPageTemplate from "./components/TagPageTemplate";


function App() {
  return (
    <div >

      <Header />
      {/* <HomeRight> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/about'} element={<AboutUs />} />
          <Route path={'/Post'} element={<PostPage />} />
          <Route path={'/Profile/:id'} element={<ProfilePage />} />
          <Route path={'/Profile'} element={<ProfilePage />} />
          <Route path={'/Tags'} element={<Write />} />
          <Route path={'/editor'} element={<Write />} />
          <Route path={'/post/:id'} element={<PostPage />} />
          <Route path={'/tags/:id'} element={<TagPageTemplate/>} />

          {/* <Route path={'/contact'} element={<Contact />} /> */}
        </Route>
      </Routes>
      {/* </HomeRight> */}


    </div>
  );
}

export default App;
