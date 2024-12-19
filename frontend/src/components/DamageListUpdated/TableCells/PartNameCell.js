// src/components/DamageListUpdated/TableCells/PartNameCell.js
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import useCarPartStore from '../../../store/carPartStore';

function PartNameCell({ value, onChange, isEditable }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { carParts, loading, fetchCarParts } = useCarPartStore();

  useEffect(() => {
    fetchCarParts();
  }, [fetchCarParts]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isEditable) {
    return <td className="px-4 py-2">{value}</td>;
  }

  return (
    <td className="px-4 py-2 relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          className="w-full border rounded pl-8 pr-2 py-1 text-sm"
          placeholder="Search part..."
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              onChange(null);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-32 overflow-y-auto border border-gray-200">
          {loading ? (
            <div className="px-3 py-2 text-sm text-gray-500">Loading parts...</div>
          ) : carParts.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">No parts found</div>
          ) : (
            carParts
              .filter(part => part.CarPartName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((part) => (
                <button
                  key={part.CarPartMasterID}
                  onClick={() => {
                    onChange(part);
                    setSearchTerm(part.CarPartName);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1 text-sm hover:bg-blue-50"
                >
                  <div className="font-medium">{part.CarPartName}</div>
                  <div className="text-xs text-gray-500">{part.PartType}</div>
                </button>
              ))
          )}
        </div>
      )}
    </td>
  );
}

export default PartNameCell;
