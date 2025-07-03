import React, { useState } from 'react';
import WatchtimeChart from './WatchtimeChart';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (ev) => {
      const json = JSON.parse(ev.target.result);
      const videoEntries = json.filter(
        (e) => e.title?.startsWith('Watched') || e.header === 'YouTube'
      );
      const minutes = videoEntries.length * 5;
      setEntries(videoEntries);
      setTotalMinutes(minutes);
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">YouTube Watchtime Viewer</h1>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="mb-6"
      />
      {entries.length > 0 && (
        <>
          <p className="text-xl mb-4">
            Geschätzte Watchtime:{' '}
            <strong>{(totalMinutes / 60).toFixed(2)} Stunden</strong>
          </p>
          <WatchtimeChart entries={entries} />
        </>
      )}
    </div>
  );
}
