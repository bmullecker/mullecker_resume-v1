
import type { Experience as ExperienceType } from '../data';

export default function Experience({ experience }: { experience: ExperienceType[] }) {
    return (
        <section className="mb-4 print:mb-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2 mb-4 print:mb-2" style={{ marginTop: '20px' }}>
                Professional Experience
            </h3>
            <div className="space-y-4 print:space-y-2">
                {experience.map((job, index) => (
                    <div key={index} className="break-inside-avoid">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 print:mb-1">
                            <h4 className="text-lg font-bold text-gray-900 print:text-base">
                                {job.role} <span className="font-medium text-gray-700 italic">at {job.company}</span>
                            </h4>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                {job.date}
                            </span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm print:text-xs">
                            {job.responsibilities.map((req, i) => (
                                <li key={i} className="leading-normal" dangerouslySetInnerHTML={{ __html: req }} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
