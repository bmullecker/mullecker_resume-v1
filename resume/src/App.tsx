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

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const initialStore: VersionsStore = {
  activeId: 'v1',
  versions: [{ id: 'v1', name: 'Default', createdAt: new Date().toISOString(), data: resumeData }],
};

function App() {
  const [data, setData] = useState<ResumeData>(resumeData);
  const [store, setStore] = useState<VersionsStore>(initialStore);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('resume-store');
    if (savedData) {
      try {
        const parsedStore = JSON.parse(savedData);
        setStore(parsedStore);

        const activeVersion = parsedStore.versions.find(
          (v: ResumeVersion) => v.id === parsedStore.activeId
        );

        if (activeVersion) {
          setData(activeVersion.data);
        }
      } catch (err) {
        console.error("Failed to parse saved resume data", err);
      }
    }
  }, []);

  const handleDataChange = useCallback((newData: ResumeData) => {
    setData(newData);
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

  const handleSavePdf = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPdfGenerating(true);

    const element = document.getElementById('resume-content');
    if (!element) {
      setIsPdfGenerating(false);
      return;
    }

    try {
      // Temporarily hide shadow and border for clean print
      const originalShadow = element.style.boxShadow;
      const originalBorder = element.style.border;
      element.style.boxShadow = 'none';
      element.style.border = 'none';

      const canvas = await html2canvas(element, { scale: 2, windowWidth: 816 });

      // Restore styles
      element.style.boxShadow = originalShadow;
      element.style.border = originalBorder;

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });

      const pdfWidth = 8.5;
      const pdfHeight = 11;

      // Calculate scaled height to maintain aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      let finalWidth = pdfWidth;
      let finalHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // If the content is slightly taller than 11 inches, scale it down to force 1 page
      if (finalHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = (imgProps.width * pdfHeight) / imgProps.height;
      }

      // Center horizontally if scaled down by height
      const xOffset = (pdfWidth - finalWidth) / 2;

      pdf.addImage(imgData, 'JPEG', xOffset, 0, finalWidth, finalHeight);
      pdf.save('resume.pdf');
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <div className="app-container">
      <div className="action-toolbar">
        <Jazzify />
        <button
          onClick={() => setSidebarOpen(true)}
          className="btn-edit-toggle"
        >
          Edit Resume
        </button>
        <button
          onClick={() => setVersionsOpen(true)}
          className="btn-versions-toggle"
        >
          Edit Versions
        </button>

        <button onClick={handlePrint} className="btn-print">
          Print Resume
        </button>
        <button onClick={handleSavePdf} className="btn-pdf" disabled={isPdfGenerating}>
          {isPdfGenerating ? 'Generating...' : 'Save PDF'}
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

