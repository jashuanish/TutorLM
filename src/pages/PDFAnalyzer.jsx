import React from 'react';
import PDFUpload from '../components/PDFUpload';

const PDFAnalyzer = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI-Powered PDF Learning Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your PDF documents and get personalized learning resources that specifically explain the content
          </p>
        </div>
        
        <PDFUpload />
      </div>
    </div>
  );
};

export default PDFAnalyzer;
