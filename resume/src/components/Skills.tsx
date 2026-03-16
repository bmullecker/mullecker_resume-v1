
import type { SkillCategory } from '../data';

export default function Skills({ skills }: { skills: SkillCategory[] }) {
    return (
        <section className="mb-8 print:mb-6 break-inside-avoid">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2 mb-6 print:mb-4">
                Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
                {skills.map((category, index) => (
                    <div key={index}>
                        <h4 className="font-bold text-gray-900 mb-2">{category.category}</h4>
                        <div className="flex flex-wrap gap-2">
                            {category.items.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-100 text-gray-800 border border-gray-200 px-3 py-1 rounded-sm text-sm font-medium"
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
