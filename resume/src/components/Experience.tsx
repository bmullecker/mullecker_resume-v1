import type { Experience as ExperienceType } from '../data';

export default function Experience({ experience }: { experience: ExperienceType[] }) {
    return (
        <section className="experience-section">
            <h3 className="section-heading" style={{ marginTop: '20px' }}>
                Professional Experience
            </h3>
            <div className="experience-list">
                {experience.map((job, index) => (
                    <div key={index} className="experience-item">
                        <table className="experience-table">
                            <tbody>
                                <tr>
                                    <td className="job-role-cell">
                                        <h4 className="job-role-title">
                                            {job.role} <span className="job-company">at {job.company}</span>
                                        </h4>
                                    </td>
                                    <td className="job-date-cell">
                                        <span className="job-date">
                                            {job.date}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <ul className="responsibility-list">
                            {job.responsibilities.map((req, i) => (
                                <li key={i} className="responsibility-item">
                                    <span className="bullet-point">•</span>
                                    <span dangerouslySetInnerHTML={{ __html: req }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
