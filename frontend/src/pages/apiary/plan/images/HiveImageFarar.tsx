import { Hive } from "../../../../models";

export const HiveImageFarar = ({hive}: {hive: Hive}) => {
  return (
    <svg className="hive" hive-id={hive.id} apiary-id={hive.apiary_id} x={hive.x} y={hive.y} height="6px" width="6px" viewBox="0 0 512 512">
    <g>
       <g>
          <polygon points="164.571,330.971 146.286,342.857 146.286,361.143 164.571,373.029 182.857,361.143 182.857,342.857 		"/>
       </g>
    </g>
    <g>
       <g>
          <polygon points="192,285.257 173.714,297.143 173.714,315.429 192,327.314 210.286,315.429 210.286,297.143 		"/>
       </g>
    </g>
    <g>
       <g>
          <polygon points="219.429,330.971 201.143,342.857 201.143,361.143 219.429,373.029 237.714,361.143 237.714,342.857 		"/>
       </g>
    </g>
    <g>
       <g>
          <path d="M237.714,164.571h-91.429c-10.057,0-18.286,8.229-18.286,18.286c0,10.057,8.229,18.286,18.286,18.286h91.429
             c10.057,0,18.286-8.229,18.286-18.286C256,172.8,247.771,164.571,237.714,164.571z"/>
       </g>
    </g>
    <g>
       <g>
          <path d="M374.857,0h-18.286H9.143v91.429h18.286V448v9.143v45.714c0,5.486,3.657,9.143,9.143,9.143h54.857
             c5.486,0,9.143-3.657,9.143-9.143v-45.714H256v45.714c0,5.486,3.657,9.143,9.143,9.143H320c5.486,0,9.143-3.657,9.143-9.143
             v-45.714h9.143h18.286h54.857v45.714c0,5.486,3.657,9.143,9.143,9.143h54.857c5.486,0,9.143-3.657,9.143-9.143v-45.714V448
             v-27.429h-73.143c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h73.143V384h-45.714c-5.486,0-9.143-3.657-9.143-9.143
             c0-5.486,3.657-9.143,9.143-9.143h45.714v-18.286h-73.143c-5.486,0-9.143-3.657-9.143-9.143c0-5.486,3.657-9.143,9.143-9.143
             h73.143v-18.286h-45.714c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h45.714v-18.286h-73.143
             c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h73.143v-18.286h-45.714c-5.486,0-9.143-3.657-9.143-9.143
             s3.657-9.143,9.143-9.143h45.714v-18.286h-73.143c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h73.143v-18.286
             h-45.714c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h45.714V128h-73.143c-5.486,0-9.143-3.657-9.143-9.143
             s3.657-9.143,9.143-9.143h73.143V91.429h18.286V0H374.857z M82.286,493.714H45.714v-36.571h36.571V493.714z M255.086,365.714
             c0,0-0.914,5.486-2.743,7.314l-27.429,18.286c-1.829,0.914-3.657,1.829-5.486,1.829c-1.829,0-3.657-0.914-5.486-1.829L192,376.686
             l-21.943,14.629c-1.829,0.914-3.657,1.829-5.486,1.829c-1.829,0-3.657-0.914-5.486-1.829l-27.429-18.286
             c-1.829-1.829-3.657-4.571-3.657-7.314v-27.429c0-2.743,1.829-5.486,3.657-7.314l23.771-15.543v-22.857
             c0-2.743,1.829-5.486,3.657-7.314l27.429-18.286c2.743-1.829,7.314-1.829,10.057,0L224,285.257
             c2.743,1.829,3.657,4.571,3.657,7.314v22.857l23.771,15.543c2.743,1.829,3.657,4.571,3.657,7.314V365.714z M237.714,219.429
             h-91.429c-20.114,0-36.571-16.457-36.571-36.571c0-20.114,16.457-36.571,36.571-36.571h91.429
             c20.114,0,36.571,16.457,36.571,36.571C274.286,202.971,257.829,219.429,237.714,219.429z M310.857,493.714h-36.571v-36.571
             h36.571V493.714z M356.571,73.143h-18.286H27.429V18.286h329.143V73.143z M429.714,457.143h36.571v36.571h-36.571V457.143z
              M484.571,73.143H374.857V18.286h109.714V73.143z"/>
       </g>
    </g>
    </svg>
   )
}