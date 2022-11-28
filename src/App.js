import React from 'react';
import './App.css';
import VideoChat from './VideoChat';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OutsideAlerter from './Pages/OutsideAlerter';
import UserPage from './Pages/UserPage';
import StartPage from './Pages/StartPage';

const App = () => {
  return (
    <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutsideAlerter />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="/StartPage" element={<StartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
      {/* <header>
        <h1>Video Chat with Hooks</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      <footer>
        <p>
          Made with{' '}
          <span role="img" aria-label="React">
            ⚛️
          </span>{' '}
          by <a href="https://twitter.com/philnash">philnash</a>
        </p>
      </footer> */}
    </div>
  );
};

export default App;
