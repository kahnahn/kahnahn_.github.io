
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercentage = (current / (total-1)) * 100;

  const milestones = [];
  for (let i = 20; i < total; i += 20) {
    milestones.push({ position: (i - 1) / (total-1) * 100, type: i % 50 === 0 ? 'mock' : 'mini' });
  }
   for (let i = 50; i < total; i += 50) {
     const existingIndex = milestones.findIndex(m => m.position === (i - 1) / (total-1) * 100);
     if(existingIndex > -1) {
         milestones[existingIndex].type = 'mock';
     } else {
        milestones.push({ position: (i - 1) / (total-1) * 100, type: 'mock' });
     }
  }


  return (
    <div className="w-full px-4 md:px-0">
      <div className="flex justify-between items-center mb-1 text-sm text-slate-400">
        <span>Progress</span>
        <span>Word {current + 1} of {total}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-4 relative">
        <div
          className="bg-indigo-600 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`absolute top-0 h-4 w-1 ${milestone.type === 'mock' ? 'bg-amber-400' : 'bg-teal-400'} transform -translate-x-1/2`}
            style={{ left: `${milestone.position}%` }}
            title={`${milestone.type === 'mock' ? 'Mock Test' : 'Mini Test'} after this word`}
          ></div>
        ))}
      </div>
       <div className="flex justify-start items-center mt-2 space-x-4 text-xs text-slate-400">
          <div className="flex items-center"><div className="w-3 h-3 bg-teal-400 rounded-sm mr-2"></div>Mini Test</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-amber-400 rounded-sm mr-2"></div>Mock Test</div>
        </div>
    </div>
  );
};

export default ProgressBar;
