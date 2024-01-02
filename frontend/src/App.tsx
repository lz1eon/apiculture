import {
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import './theme/variables.css';
import './theme/main.css';


/* Styles for package primereact */
import "primereact/resources/themes/lara-light-cyan/theme.css";


import {
  About,
  ApiaryDetail,
  ApiaryList,
  Contacts,
  Home,
  Login,
  NotFound,
  Pricing,
  Register
} from './pages';

import { useEffect, useState } from 'react';
import {
  Header,
  PrivateRoutes
} from './components';
import { AuthContext } from './contexts/AuthContext';
import { Apiary, User } from './models';
import { GeneralInfoContext } from './contexts/GeneralInfoContext';
import { Charts } from './pages/charts/Charts';
import client from './api';


setupIonicReact({
  rippleEffect: false,
  mode: 'md',
  // animated: !isPlatform('mobileweb'),
  animated: false,
});

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [apiaries, setApiaries] = useState<Apiary[]>([]);

  useEffect(() => {
      if (user)
      client.getApiaries().then((response: any) => setApiaries(response.data));    
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthReady, setIsAuthReady }}>
      <GeneralInfoContext.Provider value={{ apiaries, setApiaries }}>
            <IonReactRouter>
              <IonRouterOutlet animated={false}>
                <IonApp>
                  <Header />
                  <IonContent>
                    <Route exact path="/" render={() => user ? <Redirect to='/apiaries' /> : <Home />} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Route exact path="/login" component={Login} />

                    <PrivateRoutes>
                      <Route exact path="/apiaries/:id" component={ApiaryDetail} />
                      <Route exact path="/apiaries" component={ApiaryList} />
                      <Route exact path="/admin" component={Charts} />
                    </PrivateRoutes>
                  </IonContent> 
                </IonApp>
              </IonRouterOutlet>
            </IonReactRouter>
      </GeneralInfoContext.Provider>
    </AuthContext.Provider>
  )
};

export default App;
