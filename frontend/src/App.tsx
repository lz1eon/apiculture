import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  isPlatform,
  IonPage,
  IonContent,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { 
  Home,
  About, 
  Contacts,
  Pricing,
  Login, 
  Register, 
  NotFound,
  ApiaryList,
} from './pages';

import { 
  Header,
  PrivateRoute 
} from './components';


setupIonicReact({
  rippleEffect: false,
  mode: 'md',
  animated: !isPlatform('mobileweb'),
});

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet>
            <IonPage>
              <Header />
              <IonContent>
                <Route exact path="/" component={Home} />
                <Route exact path="/pricing" component={Pricing} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contacts" component={Contacts} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <PrivateRoute path="/apiaries" component={ApiaryList} />

                {/* <Route exact path="*" component={NotFound} /> */}
              </IonContent>  
            </IonPage>            
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
