import React from 'react';
import { FaAmbulance } from 'react-icons/fa';

export const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-pulse">
        <FaAmbulance
          className="w-16 h-16 text-indigo-500"
          />
      </div>
    </div>
  )}