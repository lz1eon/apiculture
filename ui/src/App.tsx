import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './use-cases';
import {
  Home, Login, NotFound, AboutPage, ContactsPage, ApiaryList, HiveList,
  ApiaryDetail 
} from "./components/pages";
import { Header, Footer } from './components/template';
import { AuthContext } from './contexts/AuthContext';
import { User } from './models/user';

function App() {
  const [ user, setUser ] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <BrowserRouter basename={''}>
          <Header/>
          <Routes>
            <Route
                path={'/'}
                element={
                    <Home />
                }
            />                
            <Route
                path={'/apiaries'}
                element={
                  <PrivateRoute>
                    <ApiaryList />
                  </PrivateRoute>
                }
            />
            <Route
                path={'/apiaries/:id'}
                element={
                  <PrivateRoute>
                    <ApiaryDetail/>
                  </PrivateRoute>
                }
            />                
            <Route
                path={'/hives'}
                element={
                  <PrivateRoute>
                    <HiveList />
                  </PrivateRoute>
                }
            />
            <Route path={'/login'} element={<Login />}/>
            <Route path={'/about'} element={<AboutPage />}/>
            <Route path={'/contacts'} element={<ContactsPage />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
