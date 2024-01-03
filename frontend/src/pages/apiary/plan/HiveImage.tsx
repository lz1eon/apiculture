import { Hive, HiveModels, HiveModelsInverted, HiveModelsLabels, HiveTypesInverted, HiveTypesLabels } from "../../../models";
import { 
  HiveImageDadanBlat, 
  HiveImageFarar,
  HiveImageLangstroth,
  HiveImageOther 
} from './images';

type Props = {
  hive: Hive,
  fill?: string,
  onContextMenu?: (e: any) => {}
}

const HiveImage = ({ hive, fill, onContextMenu }: Props) => {
  fill = fill ? fill : '#000000';

  const renderSVG = (model: number) => {
    switch(model) {
      case HiveModels.DADAN_BLAT:
        return <HiveImageDadanBlat hive={hive}/>;
      case HiveModels.FARAR:
        return <HiveImageFarar hive={hive} />;
      case HiveModels.LANGSTROTH:
        return <HiveImageLangstroth hive={hive} />;
      case HiveModels.OTHER:
        return <HiveImageOther hive={hive} />;
      default:
        return <HiveImageOther hive={hive} />;
    }
  }  

  return (
    <g 
      id={`group-${hive.id}`}
      hive-id={hive.id}
      apiary-id={hive.apiary_id}
      className="hive" 
      fill={fill}
      onContextMenu={onContextMenu}
    >
      <title>
        {HiveTypesLabels[HiveTypesInverted[String(hive.type)]]}        
        ({HiveModelsLabels[HiveModelsInverted[String(hive.model)]]})
      </title>
      
      {renderSVG(hive.model)}
      
      <text 
        id={`text-${hive.id}`}
        x={hive.x + 1.7} 
        y={hive.y + 7.5}
        style={{fontSize: 1.5, userSelect: 'none'}} 
      >
        {hive.number}
      </text>
    </g>
  )

  // return (

  // )
}

export default HiveImage;