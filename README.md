# 🌐 Netzwerktechnik - Interaktive Lernziele

Eine interaktive Web-Anwendung zur Klausurvorbereitung für T3INF2006 - Netzwerktechnik, basierend auf den offiziellen Lernzielen VL1-VL9.

## 🚀 Schnellstart für Kommilitonen

### Voraussetzungen
- Node.js (Version 16 oder höher) - [Download hier](https://nodejs.org/)
- Ein moderner Webbrowser (Chrome, Firefox, Safari, Edge)

### Installation & Start

1. **Repository klonen oder ZIP herunterladen**
   ```bash
   # Falls Git verfügbar:
   git clone [repository-url]
   cd visualized
   
   # Oder: ZIP-Datei entpacken und in den Ordner wechseln
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

4. **Fertig!** 🎉
   - Die Anwendung öffnet sich automatisch im Browser
   - Falls nicht: [http://localhost:3000](http://localhost:3000) aufrufen

## 📚 Was bietet die Anwendung?

### 🏗️ OSI-Modell Visualizer
- Interaktive 7-Schichten-Darstellung
- TCP/IP Mapping
- Datenfluss-Animation
- Protokoll-Zuordnung pro Schicht

### 📡 Leitungskodierung
- **NRZI, 4B5B, 5B6B** Visualisierung
- Echtzeitberechnung mit Signalverläufen
- Schritt-für-Schritt Kodierung
- Klausur-Beispiele zum Ausprobieren

### 🔢 Subnetting Calculator
- **IPv4 Netzwerk-Analyse**
- **Automatisches Subnetting**
- Binärdarstellung mit Highlighting
- Netz-/Broadcast-Adressen Berechnung

### 🛡️ CRC & Parität Rechner
- **CRC-Prüfsummen** generieren & validieren
- **Zweidimensionale Parität** berechnen
- Schritt-für-Schritt Berechnungen
- Modulo-2 Division visualisiert

### 🌐 Protokoll-Übersicht
- **HTTP-Methoden & Statuscodes**
- **Sicherheitsangriffe** (DDoS, SQL Injection, etc.)
- **IoT-Protokolle** (MQTT vs OPC UA)
- Protokoll-Zuordnungs-Quiz

### 🎯 Interaktive Übungen
- **10+ Klausuraufgaben** aus allen Bereichen
- Multiple-Choice mit sofortigen Feedback
- Fortschritts-Tracking
- Ausführliche Lösungserklärungen

## 🎨 Features

- ✅ **Responsive Design** - funktioniert auf Desktop, Tablet & Handy
- ✅ **Interaktive Animationen** - visuelles Lernen
- ✅ **Echtzeit-Berechnungen** - sofortige Ergebnisse
- ✅ **Klausur-fokussiert** - nur relevante Inhalte basierend auf Lernzielen
- ✅ **Fortschritts-Tracking** - behalten Sie den Überblick
- ✅ **Offline-fähig** - funktioniert ohne Internet (nach erstem Laden)

## 🛠️ Technologie-Stack

- **React 19** - Moderne UI-Bibliothek
- **TypeScript** - Typsicherheit
- **Tailwind CSS** - Responsive Styling
- **Lucide React** - Beautiful Icons
- **Vite** - Blitzschneller Build-Tool

## 📁 Projektstruktur

```
visualized/
├── src/
│   ├── components/          # React-Komponenten
│   │   ├── OSILayerVisualizer.tsx
│   │   ├── LineCodeVisualizer.tsx
│   │   ├── SubnettingCalculator.tsx
│   │   ├── CRCCalculator.tsx
│   │   ├── ProtocolOverview.tsx
│   │   ├── ExerciseSection.tsx
│   │   └── Navigation.tsx
│   ├── App.tsx             # Haupt-App-Komponente
│   ├── main.tsx            # App-Entry-Point
│   └── index.css           # Globale Styles
├── package.json            # Dependencies & Scripts
├── vite.config.ts          # Vite-Konfiguration
├── tailwind.config.js      # Tailwind-Konfiguration
└── README.md              # Diese Datei
```

## 🎓 Basiert auf Lernzielen

Die Anwendung ist **exakt** auf die offiziellen Lernziele VL1-VL9 zugeschnitten:

- **VL1**: OSI/TCP-IP Modell, Kommunikationsmodelle, Übertragungsarten
- **VL2**: Leitungskodierung (NRZI, 4B5B, Blockcodierungen)
- **VL3**: Fehlererkennung (CRC, Parität), MAC-Adressen, ARP
- **VL4**: IPv4/IPv6 Adressierung, Subnetting, NAT
- **VL5**: TCP/UDP, Routing-Grundlagen, Socket-Konzept
- **VL6**: Anwendungsprotokolle (HTTP, SMTP, DNS, etc.)
- **VL7**: Sicherheit (Angriffe, Verschlüsselung, VPN)
- **VL8**: HTTP-Methoden, REST, Statuscodes
- **VL9**: IoT-Protokolle (MQTT, OPC UA)

## 🚫 Bewusst NICHT enthalten

Folgende Themen aus den Übungen sind **nicht klausurrelevant** und daher ausgelassen:
- Hamming Code
- Huffman Code  
- Dijkstra Algorithmus
- REST API/MQTT Programmierung

## 🔧 Entwicklung

Für Entwickler, die die Anwendung erweitern möchten:

```bash
# Development Mode (mit Hot Reload)
npm run dev

# Build für Production
npm run build

# Preview der Production-Build
npm run preview
```

## 💡 Tipps zur Nutzung

1. **Systematisch durchgehen**: Arbeiten Sie sich durch alle Sektionen
2. **Beispiele ausprobieren**: Klicken Sie auf die "Klausur-Beispiele" Buttons
3. **Übungen lösen**: Nutzen Sie die interaktiven Aufgaben zur Selbstkontrolle
4. **Visualisierungen verstehen**: Schauen Sie sich Animationen mehrmals an
5. **Formeln üben**: Nutzen Sie die Rechner für eigene Beispiele

## 🆘 Probleme?

**Häufige Lösungen:**
- Browser-Cache leeren (Strg+F5)
- Node.js neu installieren
- `npm install` erneut ausführen
- Port 3000 von anderen Anwendungen freigeben

**Bei Fehlern:**
```bash
# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

**Viel Erfolg bei der Klausurvorbereitung! 🎯**

*Erstellt für T3INF2006 - Netzwerktechnik | DHBW Stuttgart*