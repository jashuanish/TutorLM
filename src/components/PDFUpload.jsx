import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2, Search, Brain, BookOpen } from 'lucide-react';

const PDFUpload = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      handleFileUpload(pdfFile);
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file);
    } else {
      setError('Please select a PDF file');
    }
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setError('');
    setUploadedFile(file);
    setAnalysis(null);
    setResources([]);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      setResources(data.resources);
      setUploadProgress(100);
      
      if (onUploadComplete) {
        onUploadComplete(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setAnalysis(null);
    setResources([]);
    setError('');
    setUploadProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Brain className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">PDF Learning Assistant</h2>
        </div>

        {!uploadedFile ? (
          <div>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Upload your PDF document
              </h3>
              <p className="text-gray-500 mb-4">
                Drag and drop your PDF here, or click to browse
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
              >
                Choose PDF File
              </label>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-purple-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-800">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={resetUpload}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isUploading && (
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                </div>
                <p className="text-center text-gray-600 mb-2">
                  Analyzing your PDF and finding relevant learning resources...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    PDF Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-purple-600">Word Count</p>
                      <p className="text-xl font-bold text-purple-800">{analysis.wordCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Topics Found</p>
                      <p className="text-xl font-bold text-purple-800">{analysis.topics.length}</p>
                    </div>
                  </div>
                  
                  {analysis.keywords.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-purple-700 mb-2">Key Topics</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.slice(0, 10).map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.searchQueries.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-purple-700 mb-2">Search Queries Generated</p>
                      <div className="space-y-1">
                        {analysis.searchQueries.slice(0, 5).map((query, index) => (
                          <p key={index} className="text-sm text-purple-600">• {query}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {resources.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Recommended Learning Resources ({resources.length})
                    </h3>
                    <div className="space-y-4">
                      {resources.map((resource, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1">{resource.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="capitalize">{resource.type}</span>
                                {resource.duration && <span>• {resource.duration}</span>}
                                {resource.channel && <span>• {resource.channel}</span>}
                              </div>
                            </div>
                            {resource.url && (
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                              >
                                View
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFUpload;
