
import Header from './components/Header';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import { resumeData } from './data';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 print:py-0 print:bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
      <div className="fixed top-4 right-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-black text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-800 transition-colors"
        >
          Print Resume
        </button>
      </div>
      <main className="max-w-4xl mx-auto bg-white shadow-xl print:shadow-none print:max-w-full border border-gray-100 print:border-none p-12 sm:p-16 lg:p-20 print:p-0">
        <Header personalInfo={resumeData.personalInfo} />
        <Summary summary={resumeData.summary} />
        <Experience experience={resumeData.experience} />
        <Skills skills={resumeData.skills} />
        <Education education={resumeData.education} />
      </main>
    </div>
  );
}

export default App;
