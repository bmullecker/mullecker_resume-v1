
import type { SkillCategory } from '../data';

export default function Skills({ skills }: { skills: SkillCategory[] }) {
    return (
        <section className="mb-4 print:mb-2 break-inside-avoid">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2 mb-4 print:mb-2" style={{ marginTop: '20px' }}>
                Technical Skills
            </h3>
            <div className="flex flex-col gap-3 print:gap-2">
                {skills.map((category, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 print:flex-row print:items-baseline print:gap-4">
                        <h4 className="text-sm font-bold text-gray-900 w-40 shrink-0 print:w-36">{category.category}</h4>
                        <div className="flex flex-wrap gap-1">
                            {category.items.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-100 text-gray-800 border border-gray-200 px-2 py-0.5 rounded-sm text-xs font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
