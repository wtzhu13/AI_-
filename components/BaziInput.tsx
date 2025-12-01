import React from 'react';
import { BirthDetails } from '../types';

interface BaziInputProps {
  value: BirthDetails;
  onChange: (details: BirthDetails) => void;
}

const BaziInput: React.FC<BaziInputProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof BirthDetails, val: string) => {
    onChange({ ...value, [field]: val });
  };

  const inputClass = "w-full bg-stone-900/50 border border-stone-600 text-amber-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-all placeholder-stone-600 text-center font-serif";
  const labelClass = "block text-stone-400 text-xs mb-1 text-center font-serif";

  return (
    <div className="w-full max-w-md mx-auto mb-6 p-5 bg-stone-800/30 rounded-2xl border border-stone-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-amber-500 text-lg">📅</span>
        <h3 className="text-amber-200 font-bold font-serif">输入生辰八字 (选填)</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className={labelClass}>年 (Year)</label>
          <input
            type="number"
            placeholder="1990"
            value={value.year}
            onChange={(e) => handleChange('year', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>月 (Month)</label>
          <select
            value={value.month}
            onChange={(e) => handleChange('month', e.target.value)}
            className={inputClass}
          >
            <option value="">-</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{m}月</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>日 (Day)</label>
          <select
             value={value.day}
             onChange={(e) => handleChange('day', e.target.value)}
             className={inputClass}
          >
            <option value="">-</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
              <option key={d} value={d}>{d}日</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>时 (Hour)</label>
          <select
            value={value.hour}
            onChange={(e) => handleChange('hour', e.target.value)}
            className={inputClass}
          >
            <option value="">不详</option>
            {Array.from({ length: 24 }, (_, i) => i).map(h => (
              <option key={h} value={h}>{h}:00-{h}:59</option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-center text-stone-500 text-xs mt-3">
        提供出生信息可进行【面相+八字】双重合参，结果更精准
      </p>
    </div>
  );
};

export default BaziInput;