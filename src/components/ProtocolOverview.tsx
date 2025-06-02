import React, { useState } from 'react';
import { Globe, Shield, Zap, ArrowRight } from 'lucide-react';

interface Protocol {
  name: string;
  fullName: string;
  layer: number;
  purpose: string;
  port?: number;
  examples: string[];
  category: 'network' | 'security' | 'application' | 'iot';
  description: string;
  howItWorks: string;
  characteristics: string[];
}

interface HTTPMethod {
  method: string;
  purpose: string;
  example: string;
  safe: boolean;
  idempotent: boolean;
}

interface SecurityAttack {
  name: string;
  description: string;
  example: string;
  prevention: string;
  severity: 'high' | 'medium' | 'low';
}

const ProtocolOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'protocols' | 'http' | 'security' | 'iot'>('protocols');

  const protocols: Protocol[] = [
    {
      name: 'HTTP',
      fullName: 'HyperText Transfer Protocol',
      layer: 7,
      purpose: 'Web-Kommunikation',
      port: 80,
      examples: ['Web Browser', 'REST APIs', 'AJAX'],
      category: 'application',
      description: 'HTTP ist das Grundprotokoll des World Wide Web. Es definiert, wie Web-Browser und Web-Server miteinander kommunizieren.',
      howItWorks: 'Client sendet HTTP-Request (GET, POST, etc.) → Server verarbeitet Request → Server sendet HTTP-Response mit Statuscode zurück',
      characteristics: ['Zustandslos (Stateless)', 'Request/Response-Modell', 'Text-basiert', 'TCP als Transport']
    },
    {
      name: 'HTTPS',
      fullName: 'HTTP Secure',
      layer: 7,
      purpose: 'Sichere Web-Kommunikation',
      port: 443,
      examples: ['Online Banking', 'E-Commerce', 'Login'],
      category: 'security',
      description: 'HTTPS ist HTTP mit SSL/TLS-Verschlüsselung. Es gewährleistet Vertraulichkeit, Integrität und Authentizität der Datenübertragung.',
      howItWorks: 'Client und Server führen SSL/TLS-Handshake durch → Verschlüsselte HTTP-Kommunikation → Zertifikat bestätigt Server-Identität',
      characteristics: ['Ende-zu-Ende Verschlüsselung', 'Server-Authentifizierung', 'Datenintegrität', 'Standard für sensible Daten']
    },
    {
      name: 'SMTP',
      fullName: 'Simple Mail Transfer Protocol',
      layer: 7,
      purpose: 'E-Mail versenden',
      port: 25,
      examples: ['Mail Server', 'Outlook', 'Gmail'],
      category: 'application',
      description: 'SMTP ist das Standard-Protokoll zum Versenden von E-Mails zwischen Mail-Servern und von E-Mail-Clients zu Mail-Servern.',
      howItWorks: 'Mail-Client verbindet zu SMTP-Server → Authentifizierung → MAIL FROM, RCPT TO, DATA-Befehle → E-Mail wird weitergeleitet',
      characteristics: ['Push-Protokoll (nur senden)', 'Text-basierte Befehle', 'Store-and-Forward-Prinzip', 'Arbeitet mit MX-Records']
    },
    {
      name: 'POP3',
      fullName: 'Post Office Protocol v3',
      layer: 7,
      purpose: 'E-Mail abrufen (Download)',
      port: 110,
      examples: ['Mail Client', 'Thunderbird'],
      category: 'application',
      description: 'POP3 lädt E-Mails vom Server herunter und löscht sie dort. Ideal für einen primären Computer mit lokaler E-Mail-Verwaltung.',
      howItWorks: 'Client verbindet zu POP3-Server → Authentifizierung → LIST, RETR (Download), DELE (Löschen) → Verbindung trennen',
      characteristics: ['Download-und-Lösch-Prinzip', 'Offline-Zugriff möglich', 'Keine Synchronisation', 'Einfach und ressourcenschonend']
    },
    {
      name: 'IMAP',
      fullName: 'Internet Message Access Protocol',
      layer: 7,
      purpose: 'E-Mail abrufen (Server)',
      port: 143,
      examples: ['Webmail', 'Mobile Apps'],
      category: 'application',
      description: 'IMAP belässt E-Mails auf dem Server und synchronisiert sie zwischen verschiedenen Geräten. Ideal für Multi-Device-Nutzung.',
      howItWorks: 'Client verbindet zu IMAP-Server → Authentifizierung → Ordner-Synchronisation → E-Mails bleiben auf Server → Multi-Device-Zugriff',
      characteristics: ['Server-seitige Speicherung', 'Multi-Device-Synchronisation', 'Ordner-Verwaltung', 'Online-/Offline-Modi']
    },
    {
      name: 'FTP',
      fullName: 'File Transfer Protocol',
      layer: 7,
      purpose: 'Dateiübertragung',
      port: 21,
      examples: ['FileZilla', 'Web Hosting'],
      category: 'application',
      description: 'FTP ermöglicht das Übertragen von Dateien zwischen Client und Server. Es gibt Active- und Passive-Modi für Firewall-Kompatibilität.',
      howItWorks: 'Control-Connection (Port 21) für Befehle → Data-Connection für Dateitransfer → Active/Passive Modi für Firewall-Durchlass',
      characteristics: ['Zwei separate Verbindungen', 'Active/Passive Modi', 'ASCII/Binary Transfer', 'Authentifizierung erforderlich']
    },
    {
      name: 'DNS',
      fullName: 'Domain Name System',
      layer: 7,
      purpose: 'Domain-Auflösung',
      port: 53,
      examples: ['www.google.com → IP', 'Nameserver'],
      category: 'network',
      description: 'DNS ist das "Telefonbuch des Internets". Es übersetzt lesbare Domainnamen in IP-Adressen und umgekehrt.',
      howItWorks: 'Client fragt lokalen DNS-Server → Rekursive/Iterative Anfragen → Root-Server → TLD-Server → Autoritativer Server → IP-Antwort',
      characteristics: ['Hierarchische Struktur', 'Caching für Performance', 'UDP für Anfragen', 'Verschiedene Record-Typen (A, AAAA, MX, etc.)']
    },
    {
      name: 'DHCP',
      fullName: 'Dynamic Host Configuration Protocol',
      layer: 7,
      purpose: 'IP-Konfiguration zuweisen',
      port: 67,
      examples: ['Router', 'IP-Vergabe', 'Subnet Mask'],
      category: 'network',
      description: 'DHCP automatisiert die Netzwerkkonfiguration. Clients erhalten automatisch IP-Adresse, Subnetzmaske, Gateway und DNS-Server.',
      howItWorks: 'DHCP Discover (Broadcast) → DHCP Offer (Server) → DHCP Request (Client) → DHCP Acknowledge (Server) [DORA-Prozess]',
      characteristics: ['Automatische IP-Vergabe', 'Lease-Time-Konzept', 'DORA-Prozess', 'Zentrale Konfiguration']
    },
    {
      name: 'SSH',
      fullName: 'Secure Shell',
      layer: 7,
      purpose: 'Sichere Fernsteuerung',
      port: 22,
      examples: ['Terminal', 'SCP', 'SFTP'],
      category: 'security',
      description: 'SSH bietet sichere, verschlüsselte Fernsteuerung von Computern. Es ersetzt unsichere Protokolle wie Telnet und bietet Tunneling.',
      howItWorks: 'Verschlüsselter Verbindungsaufbau → Authentifizierung (Passwort/Keys) → Verschlüsselte Befehlsübertragung → Sichere Shell-Sitzung',
      characteristics: ['Starke Verschlüsselung', 'Public-Key-Authentifizierung', 'Port-Forwarding/Tunneling', 'Sichere Dateiübertragung (SCP/SFTP)']
    },
    {
      name: 'Telnet',
      fullName: 'Telnet Protocol',
      layer: 7,
      purpose: 'Unverschlüsselte Fernsteuerung',
      port: 23,
      examples: ['Legacy Systems', 'Debug'],
      category: 'application',
      description: 'Telnet ermöglicht Fernsteuerung über Netzwerk, überträgt aber alles unverschlüsselt. Heute meist durch SSH ersetzt.',
      howItWorks: 'TCP-Verbindung aufbauen → Terminal-Emulation → Klartextübertragung aller Daten → Interaktive Shell-Sitzung',
      characteristics: ['Unverschlüsselt (Sicherheitsrisiko)', 'Einfache Terminal-Emulation', 'Text-basiert', 'Legacy-Protokoll']
    },
    {
      name: 'NTP',
      fullName: 'Network Time Protocol',
      layer: 7,
      purpose: 'Zeitynchronisation',
      port: 123,
      examples: ['System Clock', 'Server Time'],
      category: 'network',
      description: 'NTP synchronisiert die Uhren von Computern über Netzwerke. Wichtig für Logs, Kryptografie und verteilte Systeme.',
      howItWorks: 'Client fragt NTP-Server nach Zeit → Roundtrip-Time-Messung → Offset-Berechnung → Schrittweise Uhren-Anpassung',
      characteristics: ['Hierarchische Stratum-Ebenen', 'Millisekunden-Genauigkeit', 'UTC-basiert', 'Kompensiert Netzwerk-Latenz']
    },
    {
      name: 'SNMP',
      fullName: 'Simple Network Management Protocol',
      layer: 7,
      purpose: 'Netzwerk-Management',
      port: 161,
      examples: ['Router Config', 'Monitoring'],
      category: 'network',
      description: 'SNMP ermöglicht das Management und Monitoring von Netzwerkgeräten. Manager können Informationen abfragen und Konfigurationen ändern.',
      howItWorks: 'SNMP-Manager sendet GET/SET-Requests → SNMP-Agent auf Gerät antwortet → MIB (Management Information Base) definiert verfügbare Daten',
      characteristics: ['Agent/Manager-Modell', 'MIB-basierte Datenstruktur', 'GET/SET/TRAP-Operationen', 'Community Strings für Sicherheit']
    },
    {
      name: 'ARP',
      fullName: 'Address Resolution Protocol',
      layer: 2,
      purpose: 'IP → MAC Adress-Auflösung',
      examples: ['Local Network', 'Switch Tables'],
      category: 'network',
      description: 'ARP löst IP-Adressen in MAC-Adressen auf. Essentiell für die Kommunikation im lokalen Netzwerk (Layer 2 → Layer 3 Mapping).',
      howItWorks: 'ARP Request (Broadcast): "Wer hat IP X?" → ARP Reply (Unicast): "Ich habe IP X, meine MAC ist Y" → ARP-Tabelle aktualisieren',
      characteristics: ['Broadcast-basiert (IPv4)', 'ARP-Cache/Tabelle', 'Gratuitous ARP möglich', 'Nur im lokalen Netzwerk']
    },
    {
      name: 'TCP',
      fullName: 'Transmission Control Protocol',
      layer: 4,
      purpose: 'Zuverlässige Datenübertragung',
      examples: ['HTTP', 'SMTP', 'FTP'],
      category: 'network',
      description: 'TCP gewährleistet zuverlässige, geordnete und fehlerfreie Datenübertragung. Verbindungsorientiert mit Flusskontrolle und Überlastkontrolle.',
      howItWorks: 'Three-Way Handshake → Datenübertragung mit Sequence-Nummern → Acknowledgments → Retransmission bei Verlusten → Connection Teardown',
      characteristics: ['Verbindungsorientiert', 'Zuverlässig (Guaranteed Delivery)', 'Flusskontrolle', 'Congestion Control', 'Full-Duplex']
    },
    {
      name: 'UDP',
      fullName: 'User Datagram Protocol',
      layer: 4,
      purpose: 'Schnelle Datenübertragung',
      examples: ['DNS', 'Video Streaming', 'Games'],
      category: 'network',
      description: 'UDP ist ein einfaches, verbindungsloses Protokoll ohne Zuverlässigkeitsgarantien. Geringer Overhead, ideal für zeitkritische Anwendungen.',
      howItWorks: 'Direkte Datagram-Übertragung → Keine Verbindung → Keine Bestätigungen → Best-Effort Delivery → Anwendung übernimmt Fehlerbehandlung',
      characteristics: ['Verbindungslos', 'Unzuverlässig (Best Effort)', 'Geringer Overhead', 'Broadcast/Multicast-fähig', 'Schnell']
    }
  ];

  const httpMethods: HTTPMethod[] = [
    {
      method: 'GET',
      purpose: 'Daten abrufen (Read)',
      example: 'GET /api/users/123',
      safe: true,
      idempotent: true
    },
    {
      method: 'POST',
      purpose: 'Neue Ressource erstellen',
      example: 'POST /api/users',
      safe: false,
      idempotent: false
    },
    {
      method: 'PUT',
      purpose: 'Ressource vollständig ersetzen',
      example: 'PUT /api/users/123',
      safe: false,
      idempotent: true
    },
    {
      method: 'PATCH',
      purpose: 'Ressource teilweise ändern',
      example: 'PATCH /api/users/123',
      safe: false,
      idempotent: false
    },
    {
      method: 'DELETE',
      purpose: 'Ressource löschen',
      example: 'DELETE /api/users/123',
      safe: false,
      idempotent: true
    }
  ];

  const httpStatusCodes = [
    { code: '200', name: 'OK', description: 'Anfrage erfolgreich' },
    { code: '201', name: 'Created', description: 'Ressource erstellt' },
    { code: '400', name: 'Bad Request', description: 'Fehlerhafte Anfrage' },
    { code: '401', name: 'Unauthorized', description: 'Authentifizierung erforderlich' },
    { code: '404', name: 'Not Found', description: 'Ressource nicht gefunden' },
    { code: '500', name: 'Internal Server Error', description: 'Serverfehler' }
  ];

  const securityAttacks: SecurityAttack[] = [
    {
      name: 'DDoS (Distributed Denial of Service)',
      description: 'Verteilter Angriff zur Systemüberlastung',
      example: 'Botnet mit 1000 Computern überlasten einen Webserver',
      prevention: 'Rate Limiting, CDN, Monitoring',
      severity: 'high'
    },
    {
      name: 'SQL Injection',
      description: 'Einschleusen von schädlichem SQL-Code',
      example: "' OR '1'='1' -- in Login-Feld",
      prevention: 'Prepared Statements, Input Validation',
      severity: 'high'
    },
    {
      name: 'Supply Chain Attack',
      description: 'Angriff auf Software-Lieferkette',
      example: 'SolarWinds Hack (2020) - Malware in Updates',
      prevention: 'Code Signing, Dependency Scanning',
      severity: 'high'
    },
    {
      name: '0-Day Exploit',
      description: 'Ausnutzung unbekannter Sicherheitslücken',
      example: 'Angriff vor Verfügbarkeit eines Patches',
      prevention: 'Defense in Depth, Monitoring',
      severity: 'high'
    }
  ];

  const iotProtocols = [
    {
      name: 'MQTT',
      model: 'Publish/Subscribe',
      characteristics: ['Leichtgewichtig', 'Topic-basiert', 'QoS Levels'],
      useCases: ['IoT Sensoren', 'Home Automation', 'Telemetrie']
    },
    {
      name: 'OPC UA',
      model: 'Client/Server',
      characteristics: ['Industriestandard', 'Semantische Modelle', 'Sicherheit'],
      useCases: ['Industrieautomation', 'SCADA', 'Maschinendaten']
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'network': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'application': return 'bg-green-100 text-green-800';
      case 'iot': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🌐</span>
          Protokoll-Übersicht & Sicherheit
        </h2>
        <p className="text-gray-600 mb-6">
          Umfassende Übersicht über Netzwerkprotokolle, HTTP-Methoden, 
          Sicherheitsangriffe und IoT-Kommunikation.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'protocols', label: 'Protokolle', icon: Globe },
            { id: 'http', label: 'HTTP/REST', icon: ArrowRight },
            { id: 'security', label: 'Sicherheit', icon: Shield },
            { id: 'iot', label: 'IoT', icon: Zap }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Protocols Tab */}
      {activeTab === 'protocols' && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Netzwerkprotokolle</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-xl">{protocol.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(protocol.category)}`}>
                    Layer {protocol.layer}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{protocol.fullName}</p>
                <p className="text-gray-700 mb-4">{protocol.description}</p>
                
                {protocol.port && (
                  <div className="text-sm text-blue-600 mb-3 font-mono">
                    Port: {protocol.port}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">🔄 Funktionsweise:</h5>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                      {protocol.howItWorks}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">✨ Eigenschaften:</h5>
                    <div className="flex flex-wrap gap-1">
                      {protocol.characteristics.map((char, i) => (
                        <span
                          key={i}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">📚 Beispiele:</h5>
                    <div className="flex flex-wrap gap-1">
                      {protocol.examples.map((example, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HTTP/REST Tab */}
      {activeTab === 'http' && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="text-xl font-semibold mb-4">HTTP-Methoden</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Methode</th>
                    <th className="px-4 py-2 border-b text-left">Zweck</th>
                    <th className="px-4 py-2 border-b text-left">Beispiel</th>
                    <th className="px-4 py-2 border-b text-left">Safe</th>
                    <th className="px-4 py-2 border-b text-left">Idempotent</th>
                  </tr>
                </thead>
                <tbody>
                  {httpMethods.map((method) => (
                    <tr key={method.method} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b font-semibold text-blue-600">
                        {method.method}
                      </td>
                      <td className="px-4 py-2 border-b">{method.purpose}</td>
                      <td className="px-4 py-2 border-b font-mono text-sm">{method.example}</td>
                      <td className="px-4 py-2 border-b">
                        <span className={`text-xs px-2 py-1 rounded ${
                          method.safe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {method.safe ? 'Ja' : 'Nein'}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b">
                        <span className={`text-xs px-2 py-1 rounded ${
                          method.idempotent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {method.idempotent ? 'Ja' : 'Nein'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="section-card">
            <h3 className="text-xl font-semibold mb-4">HTTP-Statuscodes</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {httpStatusCodes.map((status) => (
                <div
                  key={status.code}
                  className={`border rounded-lg p-4 ${
                    status.code.startsWith('2') ? 'border-green-300 bg-green-50' :
                    status.code.startsWith('4') ? 'border-yellow-300 bg-yellow-50' :
                    'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-mono font-bold text-lg">{status.code}</span>
                    <span className="font-semibold">{status.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{status.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Sicherheitsangriffe</h3>
          
          <div className="space-y-4">
            {securityAttacks.map((attack) => (
              <div
                key={attack.name}
                className={`border-2 rounded-lg p-6 ${getSeverityColor(attack.severity)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-lg">{attack.name}</h4>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getSeverityColor(attack.severity)}`}>
                    {attack.severity.toUpperCase()}
                  </span>
                </div>
                
                <p className="mb-3">{attack.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-1">Beispiel:</h5>
                    <p className="text-sm bg-white bg-opacity-50 p-2 rounded font-mono">
                      {attack.example}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-1">Prävention:</h5>
                    <p className="text-sm bg-white bg-opacity-50 p-2 rounded">
                      {attack.prevention}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Unterschied Authentifizierung vs. Autorisierung:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Authentifizierung:</strong> "Wer bist du?" (Login mit Username/Passwort)</p>
              <p><strong>Autorisierung:</strong> "Was darfst du?" (Berechtigung für bestimmte Aktionen)</p>
            </div>
          </div>
        </div>
      )}

      {/* IoT Tab */}
      {activeTab === 'iot' && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">IoT-Protokolle</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {iotProtocols.map((protocol) => (
              <div key={protocol.name} className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-xl mb-2">{protocol.name}</h4>
                <p className="text-blue-600 font-medium mb-4">
                  Kommunikationsmodell: {protocol.model}
                </p>
                
                <div className="mb-4">
                  <h5 className="font-medium text-gray-700 mb-2">Eigenschaften:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {protocol.characteristics.map((char, i) => (
                      <li key={i} className="text-sm text-gray-600">{char}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Einsatzgebiete:</h5>
                  <div className="flex flex-wrap gap-2">
                    {protocol.useCases.map((useCase, i) => (
                      <span
                        key={i}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-4">Kommunikationsmodelle im Vergleich:</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-purple-700 mb-3">MQTT - Publish/Subscribe</h5>
                <div className="font-mono text-sm bg-gray-100 p-3 rounded">
                  <div>Publisher → [Topic] → Broker</div>
                  <div className="ml-8">↓</div>
                  <div className="ml-4">Subscriber ← [Topic] ←</div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Entkoppelt, asynchron, topic-basiert
                </p>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-blue-700 mb-3">OPC UA - Client/Server</h5>
                <div className="font-mono text-sm bg-gray-100 p-3 rounded">
                  <div>Client ←→ Server</div>
                  <div className="ml-8">↓</div>
                  <div className="ml-4">Industrial Devices</div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Direkt, sicher, semantische Modelle
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Test Section */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">🎯 Schnell-Test: Protokoll-Zuordnung</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Welches Protokoll...?</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>löst IP → MAC auf?</span>
                <span className="font-mono text-blue-600">ARP</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>verteilt IP-Konfiguration?</span>
                <span className="font-mono text-blue-600">DHCP</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>löst Domains auf?</span>
                <span className="font-mono text-blue-600">DNS</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>sichere Fernsteuerung?</span>
                <span className="font-mono text-blue-600">SSH</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">E-Mail Protokolle:</h4>
            <div className="space-y-3">
              <div className="border border-green-300 bg-green-50 p-3 rounded">
                <div className="font-semibold text-green-800">SMTP (Port 25)</div>
                <div className="text-sm text-green-600">Versenden von E-Mails</div>
              </div>
              <div className="border border-blue-300 bg-blue-50 p-3 rounded">
                <div className="font-semibold text-blue-800">POP3 (Port 110)</div>
                <div className="text-sm text-blue-600">Download & lokale Speicherung</div>
              </div>
              <div className="border border-purple-300 bg-purple-50 p-3 rounded">
                <div className="font-semibold text-purple-800">IMAP (Port 143)</div>
                <div className="text-sm text-purple-600">Server-basierte Verwaltung</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolOverview;