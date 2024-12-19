import { ChevronLeft, ChevronRight } from 'lucide-react';

function NavigationButtons({ onPrevious, onNext }) {
  return (
    <>
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
}

export default NavigationButtons;