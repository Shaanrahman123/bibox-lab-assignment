import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import context from './context/context';
import Screen1 from './components/Screen1/Screen1';
import Screen2 from './components/Screen2/Screen2';
import Screen3 from './components/Screen3/Screen3';
import Screen4 from './components/Screen4/Screen4';

const App = () => {
  const [items, setItems] = useState([]);
  const [childs, setChilds] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('items')
      ? JSON.parse(window.localStorage.getItem('items'))
      : [];
    setItems(data);
    const data2 = window.localStorage.getItem('childs')
      ? JSON.parse(window.localStorage.getItem('childs'))
      : [];
    setChilds(data2);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('items', JSON.stringify(items) || '[]');
    window.localStorage.setItem('childs', JSON.stringify(childs) || '[]');
  }, [items]);

  return (
    <context.Provider value={{ items, setItems, childs, setChilds }}>
      <BrowserRouter>
        <Routes>
          <Route >
            <Route path="/" index element={<Screen1 />}></Route>
            <Route path="/screen2" index element={<Screen2 />}></Route>
            <Route path="/screen3" index element={<Screen3 />}></Route>
            <Route path="/screen4" index element={<Screen4 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </context.Provider>
  );
};

export default App;
