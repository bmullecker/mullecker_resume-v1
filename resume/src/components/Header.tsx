
import type { PersonalInfo } from '../data';

export default function Header({ personalInfo }: { personalInfo: PersonalInfo }) {
    return (
        <header className="border-b-4 border-black pb-6 mb-8 print:pb-4 print:mb-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase mb-2">
                {personalInfo.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-700 uppercase tracking-wide">
                    Senior UI/UX Developer
                </h2>
                <div className="text-sm sm:text-base font-medium text-gray-600 sm:text-right flex flex-col sm:items-end">
                    <span>{personalInfo.location}</span>
                    <a href={`tel:${personalInfo.phone.replace(/-/g, '')}`} className="hover:text-black hover:underline">{personalInfo.phone}</a>
                    <a href={`mailto:${personalInfo.email}`} className="hover:text-black hover:underline">{personalInfo.email}</a>
                    <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-black hover:underline">{personalInfo.linkedin}</a>
                </div>
            </div>
        </header>
    );
}
