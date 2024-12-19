import useInspectionStore from '../../store/inspectionStore';
import HeaderClone from '../../components/HeaderClone';
import ImageDisplayColumn from './components/ImageDisplayColumn';
import DamageDetailsColumn from './components/DamageDetailsColumn';
import { useReferenceData } from './hooks/useReferenceData';

function ReviewEditUpdate() {
  const { setReferenceNo, fetchImages, referenceNo } = useInspectionStore();
  
  useReferenceData(setReferenceNo, fetchImages);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <HeaderClone referenceNo={referenceNo} />
      <div className="flex flex-col md:flex-row flex-1 gap-2 md:gap-[0.5%] p-4">
        <div className="w-full md:w-[39.5%] bg-white rounded-lg shadow-md mb-2 md:mb-0">
          <ImageDisplayColumn />
        </div>
        <div className="w-full md:w-[60%] bg-white rounded-lg shadow-md">
          <DamageDetailsColumn />
        </div>
      </div>
    </div>
  );
}

export default ReviewEditUpdate;