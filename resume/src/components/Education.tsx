
import type { Education as EducationType } from '../data';

export default function Education({ education }: { education: EducationType[] }) {
    return (
        <section className="break-inside-avoid">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2 mb-4 print:mb-2" style={{ marginTop: '20px' }}>
                Education
            </h3>
            <div className="space-y-4 print:space-y-2">
                {education.map((edu, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <div>
                            <h4 className="text-base font-bold text-gray-900 print:text-sm">
                                {edu.degree}{edu.major ? `: ${edu.major}` : ''}
                            </h4>
                            <div className="text-sm text-gray-700 font-medium print:text-xs">{edu.school}</div>
                        </div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1 sm:mt-0">
                            {edu.year}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
