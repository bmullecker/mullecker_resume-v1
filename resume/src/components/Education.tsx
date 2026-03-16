
import type { Education as EducationType } from '../data';

export default function Education({ education }: { education: EducationType[] }) {
    return (
        <section className="break-inside-avoid">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2 mb-6 print:mb-4">
                Education
            </h3>
            <div className="space-y-6 print:space-y-4">
                {education.map((edu, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">
                                {edu.degree}{edu.major ? `: ${edu.major}` : ''}
                            </h4>
                            <div className="text-gray-700 font-medium">{edu.school}</div>
                        </div>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mt-1 sm:mt-0">
                            {edu.year}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
