import type { Experience as ExperienceType } from '../data';

export default function Experience({ experience }: { experience: ExperienceType[] }) {
    return (
        <section className="mb-4 print:mb-2 text-pretty">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2 mb-4 print:mb-2" style={{ marginTop: '20px' }}>
                Professional Experience
            </h3>
            <div className="space-y-4 print:space-y-2">
                {experience.map((job, index) => (
                    <div key={index} className="break-inside-avoid mb-4 print:mb-2">
                        <table className="w-full mb-2 print:mb-1 border-collapse border-0 border-spacing-0">
                            <tbody>
                                <tr>
                                    <td className="align-baseline text-left p-0 whitespace-nowrap overflow-hidden text-ellipsis">
                                        <h4 className="text-lg font-bold text-gray-900 print:text-base inline">
                                            {job.role} <span className="font-medium text-gray-700 italic text-pretty">at {job.company}</span>
                                        </h4>
                                    </td>
                                    <td className="align-baseline text-right w-32 p-0 whitespace-nowrap">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                            {job.date}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <ul className="list-none p-0 space-y-1 text-gray-700 text-sm print:text-xs">
                            {job.responsibilities.map((req, i) => (
                                <li key={i} className="flex gap-2 leading-normal">
                                    <span className="shrink-0 text-gray-900 font-bold">•</span>
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
