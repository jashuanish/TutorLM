import { X, ChevronRight, Circle } from 'lucide-react';
import { useState } from 'react';

const ConceptMap = ({ topic, onClose }) => {
  const [expandedNodes, setExpandedNodes] = useState(['Machine Learning']);

  const conceptData = {
    'Machine Learning': {
      connections: ['Neural Networks', 'Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning'],
      description: 'AI technique enabling systems to learn from data'
    },
    'Neural Networks': {
      connections: ['Deep Learning', 'Backpropagation', 'CNN', 'RNN'],
      description: 'Computing systems inspired by biological neural networks'
    },
    'Deep Learning': {
      connections: ['TensorFlow', 'PyTorch', 'Transfer Learning'],
      description: 'Subset of ML using neural networks with multiple layers'
    },
    'Supervised Learning': {
      connections: ['Regression', 'Classification', 'Decision Trees'],
      description: 'Learning from labeled training data'
    },
    'Unsupervised Learning': {
      connections: ['Clustering', 'Dimensionality Reduction', 'PCA'],
      description: 'Finding patterns in unlabeled data'
    },
    'Reinforcement Learning': {
      connections: ['Q-Learning', 'Policy Gradients', 'RL Algorithms'],
      description: 'Learning through interaction with environment'
    },
    'Regression': {
      connections: [],
      description: 'Predicting continuous values'
    },
    'Classification': {
      connections: [],
      description: 'Predicting categorical labels'
    },
    'Backpropagation': {
      connections: [],
      description: 'Algorithm for training neural networks'
    },
    'CNN': {
      connections: [],
      description: 'Convolutional Neural Networks for image processing'
    },
    'RNN': {
      connections: [],
      description: 'Recurrent Neural Networks for sequence data'
    }
  };

  const toggleNode = (node) => {
    setExpandedNodes(prev =>
      prev.includes(node)
        ? prev.filter(n => n !== node)
        : [...prev, node]
    );
  };

  const renderNode = (nodeName, level = 0, parentPath = []) => {
    const node = conceptData[nodeName];
    if (!node) return null;

    const isExpanded = expandedNodes.includes(nodeName);
    const hasChildren = node.connections.length > 0;
    const path = [...parentPath, nodeName];

    return (
      <div key={nodeName} className="relative" style={{ marginLeft: `${level * 24}px` }}>
        <div className="flex items-start mb-4">
          <div className="flex items-center space-x-2">
            {hasChildren && (
              <button
                onClick={() => toggleNode(nodeName)}
                className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
              >
                <ChevronRight
                  size={16}
                  className={`text-gray-600 transition-transform duration-200 ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>
            )}
            {!hasChildren && <div className="w-6" />}
            
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                level === 0
                  ? 'bg-gradient-to-r from-darkBlue-600 to-darkBlue-700 text-white font-semibold shadow-lg'
                  : 'bg-white border-2 border-gray-300 hover:border-darkBlue-400 hover:shadow-md'
              }`}
              onClick={() => hasChildren && toggleNode(nodeName)}
            >
              <Circle size={12} className={level === 0 ? 'text-white' : 'text-darkBlue-600'} fill="currentColor" />
              <span>{nodeName}</span>
            </div>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-6 border-l-2 border-gray-200 pl-4 animate-slide-down">
            {node.connections.map((child) => renderNode(child, level + 1, path))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Concept Map</h2>
            <p className="text-sm text-gray-500 mt-1">Explore related concepts for "{topic}"</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)] bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="space-y-2">
            {renderNode(topic || 'Machine Learning')}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Interactive concept map • Click nodes to expand/collapse
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-darkBlue-600 text-white rounded-lg hover:bg-darkBlue-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConceptMap;

