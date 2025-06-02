import React, { useState } from 'react';
import { Network, Layers, Shield, Globe, Code, Target } from 'lucide-react';
import Navigation from './components/Navigation';
import OSILayerVisualizer from './components/OSILayerVisualizer';
import LineCodeVisualizer from './components/LineCodeVisualizer';
import SubnettingCalculator from './components/SubnettingCalculator';
import CRCCalculator from './components/CRCCalculator';
import ProtocolOverview from './components/ProtocolOverview';
import ExerciseSection from './components/ExerciseSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('osi');

  const sections = [
    { id: 'osi', title: 'OSI-Modell', icon: Layers, component: OSILayerVisualizer },
    { id: 'linecode', title: 'Leitungskodierung', icon: Code, component: LineCodeVisualizer },
    { id: 'subnetting', title: 'Subnetting', icon: Network, component: SubnettingCalculator },
    { id: 'crc', title: 'CRC & Parität', icon: Shield, component: CRCCalculator },
    { id: 'protocols', title: 'Protokolle', icon: Globe, component: ProtocolOverview },
    { id: 'exercises', title: 'Übungsaufgaben', icon: Target, component: ExerciseSection },
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || OSILayerVisualizer;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Network className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Netzwerktechnik - Interaktive Lernziele
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navigation 
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="mt-8">
          <ActiveComponent />
        </main>
      </div>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>🎯 Interaktive Klausurvorbereitung für T3INF2006 - Netzwerktechnik</p>
            <p className="text-sm mt-2">Basierend auf den offiziellen Lernzielen VL1-VL9</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;