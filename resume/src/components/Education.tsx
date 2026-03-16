import type { Education as EducationType } from '../data';

export default function Education({ education }: { education: EducationType[] }) {
    return (
        <section className="break-inside-avoid">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2 mb-4 print:mb-2" style={{ marginTop: '20px' }}>
                Education
            </h3>
            <div className="space-y-4 print:space-y-2">
                {education.map((edu, index) => (
                    <table key={index} className="w-full mb-4 print:mb-2 border-collapse border-0 border-spacing-0">
                        <tbody>
                            <tr>
                                <td className="align-baseline text-left p-0">
                                    <h4 className="text-base font-bold text-gray-900 print:text-sm inline">
                                        {edu.degree}{edu.major ? `: ${edu.major}` : ''}
                                    </h4>
                                    <div className="text-sm text-gray-700 font-medium print:text-xs">{edu.school}</div>
                                </td>
                                <td className="align-baseline text-right w-32 p-0 whitespace-nowrap">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
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
