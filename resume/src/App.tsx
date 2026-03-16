import React from 'react';
import Header from './components/Header';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Jazzify from './components/Jazzify';
import { resumeData } from './data';

function App() {
  const handlePrint = (e: React.MouseEvent) => {
    console.log('Print Clicked');
    e.stopPropagation();
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 print:py-0 print:bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
      <div className="fixed top-6 right-6 print:hidden flex flex-col sm:flex-row gap-4 z-[9999]">
        <Jazzify />
        <button
          onClick={handlePrint}
          className="bg-black text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-gray-800 transition-all active:scale-95 cursor-pointer !pointer-events-auto"
        >
          Print Resume
        </button>
      </div>
      <div id="resume-content" className="max-w-4xl mx-auto bg-white shadow-xl print:shadow-none print:max-w-full border border-gray-100 print:border-none p-12 sm:p-16 lg:p-20 print:p-0 print:text-sm">
        <Header personalInfo={resumeData.personalInfo} />
        <main>
          <Experience experience={resumeData.experience} />
          <Skills categories={resumeData.skills} />
          <Education education={resumeData.education} />
        </main>
      </div>
    </div>
  );
}

export default App;
