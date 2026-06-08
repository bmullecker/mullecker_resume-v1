import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Jazzify from './components/Jazzify';
import EditorSidebar from './components/EditorSidebar';
import VersionManager from './components/VersionManager';
import { resumeData } from './data';
import type { ResumeData, VersionsStore, ResumeVersion } from './data';

const initialStore: VersionsStore = {
  activeId: 'v1',
  versions: [{ id: 'v1', name: 'Default', createdAt: new Date().toISOString(), data: resumeData }],
};

function App() {
  const [data, setData] = useState<ResumeData>(resumeData);
  const [store, setStore] = useState<VersionsStore>(initialStore);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [versionsOpen, setVersionsOpen] = useState(false);
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('resume-store');
    if (savedData) {
      setStore(JSON.parse(savedData));
    }
  }, []);

  // Keep the active version's data in sync as the user edits
  const handleDataChange = useCallback((newData: ResumeData) => {
    setData(newData);
    // Correct syntax: (prev: VersionsStore)
    setStore((prev: VersionsStore) => ({
      ...prev,
      versions: prev.versions.map(v =>
        v.id === prev.activeId ? { ...v, data: newData } : v
      ),
    }));
  }, []);

  const handleSwitch = (version: ResumeVersion) => {
    setData(version.data);
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.print();
  };

  // if (!loaded) return null;

  return (
    <div className="app-container">
      <div className="action-toolbar">
        <Jazzify />
        <button
          onClick={() => setVersionsOpen(true)}
          className="btn-versions-toggle"
        >
          ⎇ Versions
        </button>
        <button
          onClick={() => setSidebarOpen(true)}
          className="btn-edit-toggle"
        >
          Edit Resume
        </button>
        <button onClick={handlePrint} className="btn-print">
          Print Resume
        </button>
      </div>

      <VersionManager
        store={store}
        currentData={data}
        isOpen={versionsOpen}
        onClose={() => setVersionsOpen(false)}
        onSwitch={handleSwitch}
        onStoreChange={setStore}
      />

      <EditorSidebar
        data={data}
        onChange={handleDataChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        store={store}
        onStoreChange={setStore}
      />

      <div id="resume-content" className="resume-wrapper">
        <Header personalInfo={data.personalInfo} />
        <main>
          <Experience experience={data.experience} />
          <Skills categories={data.skills} />
          <Education education={data.education} />
        </main>
      </div>
    </div>
  );
}

export default App;

