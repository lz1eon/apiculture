import { Hive, HiveModels } from "../../../models";
import { 
  HiveImageDadanBlat, 
  HiveImageFarar,
  HiveImageLangstroth,
  HiveImageOther 
} from './images';

type Props = {
  hive: Hive,
  fill: string,
  onContextMenu?: (e: any) => {}
}

const HiveImage = ({ hive, fill, onContextMenu }: Props) => {

  const renderSVG = (model: number) => {
    switch(model) {
      case HiveModels.DADAN_BLAT:
        return <HiveImageDadanBlat hive={hive} fill={fill}/>;
      case HiveModels.FARAR:
        return <HiveImageFarar hive={hive} fill={fill} />;
      case HiveModels.LANGSTROTH:
        return <HiveImageLangstroth hive={hive} fill={fill} />;
      case HiveModels.OTHER:
        return <HiveImageOther hive={hive} fill={fill} />;
      default:
        return <HiveImageOther hive={hive} fill={fill} />;
    }
  }  

  return (
    <g 
      id={`group-${hive.id}`}
      hive-id={hive.id}
      apiary-id={hive.apiary_id}
      className="hive" 
      onContextMenu={onContextMenu}
    >
      <title>Hive</title>
      
      {renderSVG(hive.model)}
      
      <text 
        id={`text-${hive.id}`}
        x={hive.x + 1.7} 
        y={hive.y + 7.5}
        style={{fontSize: 1.5}} 
      >
        {hive.number}
      </text>
    </g>
  )

  // return (

  // )
}

export default HiveImage;