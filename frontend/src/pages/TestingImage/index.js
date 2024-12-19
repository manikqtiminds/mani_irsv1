import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { decryptData } from '../../utils/encryption';
import useTestingStore from '../../store/testingStore';
import Header from '../../components/Header';
import ThumbnailColumn from './components/ThumbnailColumn';
import ImageDisplayColumn from './components/ImageDisplayColumn';

function TestingImage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setReferenceNo, fetchImages, referenceNo } = useTestingStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encryptedData = params.get('data');

    if (!encryptedData) {
      navigate('/');
      return;
    }

    try {
      const decryptedRefNo = decryptData(encryptedData);
      if (!decryptedRefNo) {
        throw new Error('Failed to decrypt reference number');
      }
      console.log('TestingImage: Decrypted reference number:', decryptedRefNo);
      setReferenceNo(decryptedRefNo);
    } catch (error) {
      console.error('TestingImage: Error decrypting reference number:', error);
      navigate('/');
    }
  }, [location.search, navigate, setReferenceNo]);

  useEffect(() => {
    if (referenceNo) {
      console.log('TestingImage: Fetching images for reference:', referenceNo);
      fetchImages();
    }
  }, [referenceNo, fetchImages]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header referenceNo={referenceNo} />
      <div className="flex flex-col md:flex-row flex-1 gap-2 md:gap-[0.5%] p-4">
        <div className="w-full md:w-[15%] bg-white rounded-lg shadow-md mb-2 md:mb-0">
          <ThumbnailColumn />
        </div>
        <div className="w-full md:w-[84.5%] bg-white rounded-lg shadow-md">
          <ImageDisplayColumn />
        </div>
      </div>
    </div>
  );
}

export default TestingImage;