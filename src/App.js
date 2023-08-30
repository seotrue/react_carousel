import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout'
import MyLibraryPage from './page/MyLibraryPage'
import './styles/index.scss'

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route>
                <Route element={<Layout />}>
                    <Route path={'/'} element={<MyLibraryPage />} />
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}


export default App;
