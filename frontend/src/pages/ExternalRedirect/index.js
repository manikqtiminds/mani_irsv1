import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExternalService } from '../../services/externalService';
import LoadingState from '../../components/external/LoadingState';
import ErrorState from '../../components/external/ErrorState';

export default function ExternalRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleExternalRequest = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const encryptedRef = params.get('ref') || params.get('data');

        if (!encryptedRef) {
          throw new Error('No reference number provided');
        }

        console.log('Processing external reference:', encryptedRef);
        
        const result = await ExternalService.processExternalReference(encryptedRef);
        
        if (result.success) {
          // Navigate to review page with internal encryption
          navigate(`/review-update?data=${encodeURIComponent(result.encryptedRef)}`, { replace: true });
        } else {
          throw new Error(result.error || 'Failed to process reference number');
        }
      } catch (error) {
        console.error('External request processing failed:', error);
        setError(error.message);
        
        // Show error for 3 seconds before redirecting
        setTimeout(() => {
          navigate('/', { 
            replace: true,
            state: { error: error.message }
          });
        }, 3000);
      }
    };

    handleExternalRequest();
  }, [location.search, navigate]);

  if (error) {
    return <ErrorState message={error} />;
  }

  return <LoadingState />;
}