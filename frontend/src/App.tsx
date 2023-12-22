import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  isPlatform,
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { images, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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

import { About } from './pages/about/About';
import { Contacts } from './pages/contacts/Contacts';
import ApiPageHeader from './pages/ApiPageHeader';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Pricing } from './pages/pricing/Pricing';
import Home from './pages/home/Home';


setupIonicReact({
  rippleEffect: false,
  mode: 'md',
  animated: !isPlatform('mobileweb'),
});

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* <IonTabs> */}
        <IonRouterOutlet>
          <IonPage>
            <ApiPageHeader />
            <IonContent>
              <Route exact path="/"><Home/></Route>
              <Route exact path="/pricing"><Pricing/></Route>
              <Route exact path="/about"><About/></Route>
              <Route exact path="/contacts"><Contacts/></Route>
              <Route exact path="/login"><Login/></Route>
              <Route exact path="/register"><Register/></Route>
              <Route exact path="/tab1"><Tab1/></Route>
              <Route exact path="/tab2"><Tab2/></Route>
              <Route exact path="/tab3"><Tab3/></Route>
            </IonContent>  
          </IonPage>            
        </IonRouterOutlet>
        {/* <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={images} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs> */}
    </IonReactRouter>
  </IonApp>
);

export default App;
