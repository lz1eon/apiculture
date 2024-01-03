import { Hive } from "../../../../models";

export const HiveImageDadanBlat = ({hive}: {hive: Hive}) => {
  return (
    <svg className="hive" hive-id={hive.id} apiary-id={hive.apiary_id} x={hive.x} y={hive.y} height="6px" width="6px" viewBox="0 0 511.998 511.998">
      <g>
        <g>
          <g>
            <path d="M426.666,409.598V290.131H85.332v119.467c-14.114,0-25.6,11.486-25.6,25.6s11.486,25.6,25.6,25.6h17.067v42.667
				c0,4.71,3.814,8.533,8.533,8.533h51.2c4.719,0,8.533-3.823,8.533-8.533v-42.667h170.667v42.667c0,4.71,3.814,8.533,8.533,8.533
				h51.2c4.719,0,8.533-3.823,8.533-8.533v-42.667h17.067c14.114,0,25.6-11.486,25.6-25.6S440.78,409.598,426.666,409.598z
				 M255.999,307.198c23.526,0,42.667,19.14,42.667,42.667c0,23.526-19.14,42.667-42.667,42.667
				c-23.526,0-42.667-19.14-42.667-42.667C213.332,326.338,232.473,307.198,255.999,307.198z M426.666,443.731h-25.6h-51.2H162.132
				h-51.2h-25.6c-4.71,0-8.533-3.831-8.533-8.533s3.823-8.533,8.533-8.533h8.533h324.267h8.533c4.71,0,8.533,3.831,8.533,8.533
				S431.376,443.731,426.666,443.731z"/>
            <path d="M474.452,163.838l-34.057-25.54c-0.008-0.009-0.017-0.017-0.026-0.017L261.17,1.747c-3.063-2.33-7.279-2.33-10.342,0
				l-179.2,136.533c-0.009,0-0.017,0.009-0.026,0.017l-34.057,25.54c-3.772,2.825-4.54,8.175-1.707,11.947
				c1.673,2.236,4.233,3.413,6.835,3.413c1.784,0,3.576-0.555,5.111-1.707l31.855-23.893h5.692v119.467h341.333V153.598h5.692
				l31.855,23.893c1.536,1.152,3.328,1.707,5.111,1.707c2.603,0,5.163-1.178,6.835-3.413
				C478.992,172.013,478.224,166.662,474.452,163.838z M255.999,255.998c-23.526,0-42.667-19.14-42.667-42.667
				c0-23.526,19.14-42.667,42.667-42.667c23.526,0,42.667,19.14,42.667,42.667C298.666,236.858,279.525,255.998,255.999,255.998z"/>
            <path d="M255.999,375.465c14.114,0,25.6-11.486,25.6-25.6s-11.486-25.6-25.6-25.6c-14.114,0-25.6,11.486-25.6,25.6
				S241.885,375.465,255.999,375.465z"/>
            <path d="M255.999,187.731c-14.114,0-25.6,11.486-25.6,25.6c0,14.114,11.486,25.6,25.6,25.6c14.114,0,25.6-11.486,25.6-25.6
				C281.599,199.217,270.113,187.731,255.999,187.731z"/>
          </g>
        </g>
      </g>
    </svg>
  )
}