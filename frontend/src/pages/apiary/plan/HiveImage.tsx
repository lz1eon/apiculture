import { Hive, HiveModels } from "../../../models";
import { 
  HiveImageDadanBlat, 
  HiveImageFarar,
  HiveImageLangstroth,
  HiveImageOther 
} from './images';

type Props = {
  hive: Hive,
  fill: string
}

const HiveImage = ({ hive, fill }: Props) => {

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
    <>
      {renderSVG(hive.model)}
      <text style={{fontSize: 1.5}} x={hive.x + 1.7} dy={hive.y + 7.5}>{hive.number}</text>
    </>
  )

  // return (

  // )
}

export default HiveImage;