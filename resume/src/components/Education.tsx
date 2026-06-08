import type { Education as EducationType } from '../data';

export default function Education({ education }: { education: EducationType[] }) {
    return (
        <section className="education-section">
            <h3 className="section-heading" style={{ marginTop: '20px' }}>
                Education
            </h3>
            <div className="education-list">
                {education.map((edu, index) => (
                    <table key={index} className="education-table">
                        <tbody>
                            <tr>
                                <td className="degree-cell">
                                    <h4 className="degree-title">
                                        {edu.degree}{edu.major ? `: ${edu.major}` : ''}
                                    </h4>
                                    <div className="school-name">{edu.school}</div>
                                </td>
                                <td className="year-cell">
                                    <span className="education-year">
                                        {edu.year}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        </section>
    );
}
