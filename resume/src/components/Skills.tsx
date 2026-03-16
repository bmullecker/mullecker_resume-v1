import type { SkillCategory } from '../data';

interface SkillsProps {
    categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
    if (!categories || !Array.isArray(categories)) {
        return null;
    }

    return (
        <section className="mt-8 print:mt-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2 mb-4 print:mb-2">
                Technical Skills
            </h2>
            <table className="w-full border-collapse">
                <tbody>
                    {categories.map((skill, index) => (
                        <tr key={index} className="group align-top">
                            <th className="w-[120px] text-left font-bold py-0.5 pr-2 text-gray-900 leading-tight align-baseline whitespace-nowrap">
                                {skill.category}
                            </th>
                            <td className="py-0.5 px-0">
                                <div className="flex flex-wrap gap-1">
                                    {skill.items.map((item, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center bg-[#f8f9fa] border border-[#e9ecef] px-1.5 py-0.5 rounded text-[12px] text-gray-800 font-medium whitespace-nowrap"
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
