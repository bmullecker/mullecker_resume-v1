import type { PersonalInfo } from '../data';

export default function Header({ personalInfo }: { personalInfo: PersonalInfo }) {
    return (
        <header className="mb-8 print:mb-6 block">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase print:text-3xl mb-1.5 print:mb-1.5">
                {personalInfo.name}
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-gray-700 uppercase tracking-wide leading-tight print:text-lg mb-1.5 print:mb-1.5">
                Senior UI/UX Architect & Engineer
            </h2>
            <div className="text-[13px] sm:text-sm font-semibold text-gray-600 uppercase tracking-wide print:text-xs mb-1.5 print:mb-1.5">
                13+ Years Bridging High-Fidelity Design & Scalable Engineering
            </div>
            <div className="block leading-none print:border-none">
                <span className="inline-block text-xs sm:text-sm font-medium text-gray-600 print:text-xs mr-2">{personalInfo.location} |</span>
                <a href={`tel:${personalInfo.phone.replace(/-/g, '')}`} className="inline-block text-xs sm:text-sm font-medium text-gray-600 print:text-xs hover:text-black hover:underline mr-2">{personalInfo.phone} |</a>
                <a href={`mailto:${personalInfo.email}`} className="inline-block text-xs sm:text-sm font-medium text-gray-600 print:text-xs hover:text-black hover:underline mr-2">{personalInfo.email} |</a>
                <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="inline-block text-xs sm:text-sm font-medium hover:text-black hover:underline text-blue-600 print:text-gray-600 print:text-xs">{personalInfo.linkedin}</a>
            </div>
        </header>
    );
}
