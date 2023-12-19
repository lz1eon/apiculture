import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequireLogin } from './components/RequireLogin';
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
            <Route path={'/'} element={<Home />}/>        
            <Route path={'/login'} element={<Login />}/>
            <Route path={'/about'} element={<AboutPage />}/>
            <Route path={'/contacts'} element={<ContactsPage />}/>

            // Paths that require login
            <Route path="*" element={
              <RequireLogin>
                <Routes>
                  <Route path={'/apiaries'} element={<ApiaryList />}/>
                  <Route path={'/apiaries/:id'} element={<ApiaryDetail/>}/>                
                  <Route path={'/hives'} element={<HiveList />}/>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </RequireLogin>
            } />                                  
          </Routes>
          <Footer/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
