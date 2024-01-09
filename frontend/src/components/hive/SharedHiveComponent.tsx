import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonPopover,
  IonRow,
  IonText
} from "@ionic/react";
import TimeAgo from "react-timeago";
import beemother from '../../assets/images/beemother.png';
import brood from '../../assets/images/brood.jpg';
import frame from '../../assets/images/frame.jpg';
import superImg from '../../assets/images/super.jpg';
import {
  HiveModelsInverted,
  HiveModelsLabels,
  HiveTypesInverted,
  HiveTypesLabels,
  SharedHive
} from "../../models";
import { useAuth } from "../../hooks/useAuth";
import { chatbox, person } from "ionicons/icons";

type SharedHiveComponentProps = {
  sharedHive: SharedHive;
};

export const SharedHiveComponent = ({ sharedHive }: SharedHiveComponentProps) => {
  const { hive, owner, recipients } = sharedHive;
  const { user } = useAuth();

  function openHive() {
    console.log('open')
  }

  return (
    <IonCard className="hive-card">
      <IonCardHeader>
        <IonCardTitle>Кошер {hive.number}</IonCardTitle>
        {user?.email === owner.email ?
          <IonCardSubtitle>
            Споделен със {
              recipients.length === 1 ?
                (<b>{recipients[0].first_name} {recipients[0].last_name}</b>)
                :
                (<>
                  <IonButton
                    id={`recipients-popover-button-${sharedHive.hive.number}`}
                    color="dark"
                    fill="clear"
                    size='small'
                  >
                    <b>{recipients.length}</b> <IonIcon src={person} />
                  </IonButton>
                  <IonPopover
                    trigger={`recipients-popover-button-${sharedHive.hive.number}`}
                    triggerAction="click"
                  >
                    {
                      recipients.map((recipient, i) => {
                        return (
                          <IonContent key={i} className="ion-padding">
                            <div>
                              <IonText color="medium">{recipient.first_name} {recipient.last_name}</IonText>
                            </div>
                          </IonContent>
                        )
                      })
                    }
                  </IonPopover>
                </>)
            }
          </IonCardSubtitle>
          :
          <IonCardSubtitle>Споделил: <b>{owner.first_name} {owner.last_name}</b></IonCardSubtitle>
        }
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText>
                {HiveTypesLabels[HiveTypesInverted[hive.type]]}
              </IonText>
            </IonCol>

            <IonCol>
              <IonText>
                {HiveModelsLabels[HiveModelsInverted[hive.model]]}
              </IonText>
            </IonCol>

            {/* <IonCol>
              <IonText>
                {hive.status}
              </IonText>
            </IonCol> */}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonImg
                src={frame}
                title="брой рамки"
                className="apis-hive-card-status-icon"
              ></IonImg>
            </IonCol>
            <IonCol>
              <IonImg
                src={beemother}
                title="майка"
                className={`apis-hive-card-status-icon ${!hive.mother ? 'apis-null' : ''}`}
              ></IonImg>
            </IonCol>
            <IonCol>
              <IonImg
                src={brood}
                title="пило"
                className={`apis-hive-card-status-icon ${!hive.brood ? 'apis-null' : ''}`}
              ></IonImg>
            </IonCol>
            <IonCol>
              <IonImg
                src={superImg}
                title="магазин"
                className={`apis-hive-card-status-icon ${!hive.super ? 'apis-null' : ''}`}
              ></IonImg>
            </IonCol>
          </IonRow>
          {user?.email === owner.email ?
            <IonRow className="ion-justify-content-start">
              <IonCol>
                <IonButton size='small' fill='clear' color='danger'>Спри да споделяш</IonButton>
              </IonCol>
            </IonRow>
            :
            <></>
          }
          <IonRow>
            <IonCol size="9"></IonCol>
            <IonCol size="3">
              <IonButton
                id={`comment-popover-button-${sharedHive.hive.number}`}
                color="dark"
                fill="clear"
                size='default'
              >
                <IonIcon src={chatbox} size="large"></IonIcon> {sharedHive.comments.length}
              </IonButton>
              <IonPopover
                trigger={`comment-popover-button-${sharedHive.hive.number}`}
                triggerAction="click"
              >
                {
                  sharedHive.comments.map((comment, i) => {
                    return (
                      <IonContent key={i} className="ion-padding">
                        <div>
                          <IonText color="medium">{comment.commentator.first_name} </IonText>
                          <IonText color="medium" style={{ fontSize: '0.9em' }}>
                            (<TimeAgo date={comment.created_datetime} />)
                          </IonText>
                        </div>
                        <IonText>{comment.text}</IonText>
                      </IonContent>
                    )
                  })
                }
              </IonPopover>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
}