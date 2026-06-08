import type { PersonalInfo } from '../data';

export default function Header({ personalInfo }: { personalInfo: PersonalInfo }) {
    return (
        <header className="header-container">
            <h1 className="header-name">
                {personalInfo.name}
            </h1>
            <h2 className="header-title">
                {personalInfo.title}
            </h2>
            <div className="header-contact-info">
                {personalInfo.location && <span className="pill">{personalInfo.location}</span>}
                {personalInfo.phone && <span className="pill">{personalInfo.phone}</span>}
                {personalInfo.email && <span className="pill">{personalInfo.email}</span>}
            </div>
        </header>
    );
}
