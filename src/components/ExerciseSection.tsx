import React, { useState } from 'react';
import { Target, CheckCircle, XCircle, RotateCcw, Lightbulb } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  example?: string;
}

const ExerciseSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState<Set<string>>(new Set());
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});

  const exercises: Exercise[] = [
    {
      id: 'linecode-1',
      title: '4B5B Kodierung',
      category: 'Leitungskodierung',
      difficulty: 'medium',
      question: 'Kodieren Sie die Bitfolge 0010 1111 mit 4B5B:',
      options: ['10100 11101', '01001 11110', '10101 11100', '01010 11101'],
      correctAnswer: '10100 11101',
      explanation: '0010 → 10100 (aus 4B5B Tabelle), 1111 → 11101 (aus 4B5B Tabelle)',
      example: 'Verwenden Sie die vorgegebene 4B5B-Tabelle zur Kodierung.'
    },
    {
      id: 'crc-1',
      title: 'CRC Berechnung',
      category: 'Fehlererkennung',
      difficulty: 'hard',
      question: 'Berechnen Sie die CRC-Prüfsumme für Nutzdaten 1101 mit Generator 1011:',
      options: ['010', '101', '110', '001'],
      correctAnswer: '010',
      explanation: 'Erweiterte Daten: 1101000. Division durch 1011 ergibt Rest 010.',
      example: 'Schritt 1: Daten um (n-1) Nullen erweitern, Schritt 2: Modulo-2 Division'
    },
    {
      id: 'subnet-1',
      title: 'Netzadresse bestimmen',
      category: 'Subnetting',
      difficulty: 'medium',
      question: 'Wie lautet die Netzadresse für 192.168.1.150/26?',
      options: ['192.168.1.128', '192.168.1.0', '192.168.1.64', '192.168.1.192'],
      correctAnswer: '192.168.1.128',
      explanation: '/26 = 255.255.255.192. IP AND Maske: 192.168.1.150 AND 255.255.255.192 = 192.168.1.128',
      example: 'Binär: 10010110 AND 11000000 = 10000000 = 128'
    },
    {
      id: 'subnet-2',
      title: 'Subnetz-Prüfung',
      category: 'Subnetting',
      difficulty: 'easy',
      question: 'Sind 10.0.1.50/24 und 10.0.1.200/24 im gleichen Subnetz?',
      options: ['Ja', 'Nein'],
      correctAnswer: 'Ja',
      explanation: 'Beide haben Netzadresse 10.0.1.0/24, da /24 die ersten 3 Oktette maskiert.',
      example: 'Bei /24 sind nur die ersten 24 Bits relevant für das Subnetz.'
    },
    {
      id: 'ipv6-1',
      title: 'IPv6 Vereinfachung',
      category: 'IPv6',
      difficulty: 'easy',
      question: 'Vereinfachen Sie: 2001:0db8:0000:0000:0000:0000:0001:0001',
      options: ['2001:db8::1:1', '2001:db8:0:0:0:0:1:1', '2001:db8::0001:0001', '2001:0db8::1:1'],
      correctAnswer: '2001:db8::1:1',
      explanation: 'Führende Nullen entfernen und längste Null-Sequenz durch :: ersetzen.',
      example: 'Regel: :: kann nur einmal pro Adresse verwendet werden.'
    },
    {
      id: 'protocol-1',
      title: 'Protokoll-Zuordnung',
      category: 'Protokolle',
      difficulty: 'easy',
      question: 'Welches Protokoll löst Domainnamen in IP-Adressen auf?',
      options: ['DHCP', 'DNS', 'ARP', 'SMTP'],
      correctAnswer: 'DNS',
      explanation: 'DNS (Domain Name System) übersetzt www.example.com → 192.168.1.1',
      example: 'Beispiel: www.google.com wird zu einer IP-Adresse wie 142.250.191.14'
    },
    {
      id: 'http-1',
      title: 'HTTP-Methoden',
      category: 'HTTP/REST',
      difficulty: 'easy',
      question: 'Welche HTTP-Methode wird verwendet, um Daten zu lesen/abrufen?',
      options: ['POST', 'PUT', 'GET', 'DELETE'],
      correctAnswer: 'GET',
      explanation: 'GET ist für das Abrufen von Daten gedacht und ist idempotent und safe.',
      example: 'GET /api/users/123 ruft Informationen über User 123 ab.'
    },
    {
      id: 'security-1',
      title: 'Sicherheitsangriffe',
      category: 'Sicherheit',
      difficulty: 'medium',
      question: 'Was ist ein DDoS-Angriff?',
      options: [
        'Direkter Zugriff auf die Datenbank',
        'Verteilte Überlastung eines Systems',
        'Diebstahl von Passwörtern',
        'Manipulation von SQL-Abfragen'
      ],
      correctAnswer: 'Verteilte Überlastung eines Systems',
      explanation: 'DDoS = Distributed Denial of Service. Viele Systeme greifen gleichzeitig an.',
      example: 'Botnet mit 10.000 Computern überlasten einen Webserver mit Anfragen.'
    },
    {
      id: 'iot-1',
      title: 'IoT-Protokolle',
      category: 'IoT',
      difficulty: 'medium',
      question: 'Welches Kommunikationsmodell verwendet MQTT?',
      options: ['Client/Server', 'Publish/Subscribe', 'Peer-to-Peer', 'Request/Response'],
      correctAnswer: 'Publish/Subscribe',
      explanation: 'MQTT nutzt Publish/Subscribe mit einem Broker als Vermittler.',
      example: 'Sensor published Temperatur → Broker → App subscribes Temperatur'
    },
    {
      id: 'parity-1',
      title: 'Zweidimensionale Parität',
      category: 'Fehlererkennung',
      difficulty: 'hard',
      question: 'Welche Paritätsbits werden für die Matrix [101, 110] (gerade Parität) benötigt?',
      options: ['Zeilen: [0,1], Spalten: [1,1,1]', 'Zeilen: [1,0], Spalten: [1,1,1]', 'Zeilen: [0,1], Spalten: [0,1,1]', 'Zeilen: [1,1], Spalten: [0,1,1]'],
      correctAnswer: 'Zeilen: [0,1], Spalten: [1,1,1]',
      explanation: 'Zeile 1: 101 hat 2 Einsen (gerade) → Parität 0. Zeile 2: 110 hat 2 Einsen (gerade) → Parität 0. Spalte 1: 11 → Parität 0. Spalte 2: 01 → Parität 1. Spalte 3: 10 → Parität 1.',
      example: 'Bei gerader Parität: ungerade Anzahl Einsen → Paritätsbit = 1'
    }
  ];

  const categories = ['all', ...new Set(exercises.map(ex => ex.category))];
  
  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAnswer = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }));
    
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise && answer === exercise.correctAnswer) {
      setCompletedExercises(prev => new Set([...prev, exerciseId]));
    }
  };

  const toggleAnswer = (exerciseId: string) => {
    setShowAnswer(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const resetProgress = () => {
    setCompletedExercises(new Set());
    setShowAnswer(new Set());
    setUserAnswers({});
  };

  const completionRate = Math.round((completedExercises.size / exercises.length) * 100);

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🎯</span>
          Interaktive Klausuraufgaben
        </h2>
        <p className="text-gray-600 mb-6">
          Testen Sie Ihr Wissen mit interaktiven Aufgaben aus allen Themenbereichen. 
          Perfekt zur Klausurvorbereitung!
        </p>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Fortschritt</h3>
            <button
              onClick={resetProgress}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="text-sm">Zurücksetzen</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <span className="font-semibold text-lg">{completionRate}%</span>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            {completedExercises.size} von {exercises.length} Aufgaben richtig gelöst
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'Alle' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-6">
        {filteredExercises.map((exercise) => {
          const isCompleted = completedExercises.has(exercise.id);
          const isAnswerShown = showAnswer.has(exercise.id);
          const userAnswer = userAnswers[exercise.id];
          const isCorrect = userAnswer === exercise.correctAnswer;

          return (
            <div
              key={exercise.id}
              className={`section-card border-l-4 ${
                isCompleted ? 'border-green-500 bg-green-50' : 'border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>{exercise.title}</span>
                    {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-600">{exercise.category}</span>
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-800 mb-3">{exercise.question}</p>
                
                {exercise.example && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Tipp:</span>
                    </div>
                    <p className="text-sm text-blue-700">{exercise.example}</p>
                  </div>
                )}

                {exercise.options && (
                  <div className="space-y-2">
                    {exercise.options.map((option, index) => {
                      const isSelected = userAnswer === option;
                      const isCorrectOption = option === exercise.correctAnswer;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(exercise.id, option)}
                          disabled={isCompleted}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            isSelected && isCorrect
                              ? 'border-green-500 bg-green-100 text-green-800'
                              : isSelected && !isCorrect
                              ? 'border-red-500 bg-red-100 text-red-800'
                              : isAnswerShown && isCorrectOption
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                            {isAnswerShown && isCorrectOption && !isSelected && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleAnswer(exercise.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  {isAnswerShown ? 'Lösung ausblenden' : 'Lösung anzeigen'}
                </button>
                
                {userAnswer && (
                  <span className={`text-sm font-medium ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isCorrect ? '✅ Richtig!' : '❌ Falsch'}
                  </span>
                )}
              </div>

              {isAnswerShown && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium text-gray-700 mb-2">Lösung & Erklärung:</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Richtige Antwort:</strong> {exercise.correctAnswer}
                  </p>
                  <p className="text-sm text-gray-600">{exercise.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">📊 Zusammenfassung</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{completedExercises.size}</div>
            <div className="text-sm text-green-700">Richtig gelöst</div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{exercises.length}</div>
            <div className="text-sm text-blue-700">Gesamt Aufgaben</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
            <div className="text-sm text-purple-700">Fortschritt</div>
          </div>
        </div>

        {completionRate === 100 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg text-center">
            <h4 className="text-lg font-bold text-green-800 mb-2">🎉 Gratulation!</h4>
            <p className="text-green-700">
              Sie haben alle Aufgaben erfolgreich gelöst! Sie sind bereit für die Klausur.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseSection;