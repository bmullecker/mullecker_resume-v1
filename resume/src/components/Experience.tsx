
import type { Experience as ExperienceType } from '../data';

export default function Experience({ experience }: { experience: ExperienceType[] }) {
    return (
        <section className="mb-8 print:mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2 mb-6 print:mb-4">
                Professional Experience
            </h3>
            <div className="space-y-8 print:space-y-6">
                {experience.map((job, index) => (
                    <div key={index} className="break-inside-avoid">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 print:mb-1">
                            <h4 className="text-xl font-bold text-gray-900">{job.role}</h4>
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                                {job.date}
                            </span>
                        </div>
                        <div className="text-lg font-medium text-gray-700 italic mb-3 print:mb-2">{job.company}</div>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base print:text-sm">
                            {job.responsibilities.map((req, i) => (
                                <li key={i} className="leading-relaxed">{req}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
