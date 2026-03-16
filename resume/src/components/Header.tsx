
import type { PersonalInfo } from '../data';

export default function Header({ personalInfo }: { personalInfo: PersonalInfo }) {
    return (
        <header className="mb-4 print:mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase mb-1 print:text-3xl">
                {personalInfo.name}
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-gray-700 uppercase tracking-wide print:text-lg mb-2 print:mb-1">
                Senior UI/UX Developer
            </h2>
            <div className="text-xs sm:text-sm font-medium text-gray-600 flex flex-wrap gap-2 items-center print:text-xs">
                <span>{personalInfo.location}</span>
                <span className="text-gray-300">|</span>
                <a href={`tel:${personalInfo.phone.replace(/-/g, '')}`} className="hover:text-black hover:underline">{personalInfo.phone}</a>
                <span className="text-gray-300">|</span>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-black hover:underline">{personalInfo.email}</a>
                <span className="text-gray-300">|</span>
                <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-black hover:underline text-blue-600 print:text-gray-600">{personalInfo.linkedin}</a>
            </div>
        </header>
    );
}
