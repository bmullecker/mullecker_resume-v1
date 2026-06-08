import type { SkillCategory } from '../data';

interface SkillsProps {
    categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
    if (!categories || !Array.isArray(categories)) {
        return null;
    }

    return (
        <section className="skills-section">
            <h2 className="section-heading">
                Technical Skills
            </h2>
            <table className="skills-table">
                <tbody>
                    {categories.map((skill, index) => (
                        <tr key={index} className="skills-row">
                            <th className="skills-category-cell">
                                {skill.category}
                            </th>
                            <td className="skills-items-cell">
                                <div className="skills-items-container">
                                    {skill.items.map((item, i) => (
                                        <span
                                            key={i}
                                            className="pill"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
