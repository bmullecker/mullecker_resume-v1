

export default function Summary({ summary }: { summary: string }) {
    return (
        <section className="mb-8 print:mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 print:hidden">
                Professional Summary
            </h3>
            <p className="text-gray-800 text-lg leading-relaxed sm:text-xl font-medium">
                {summary}
            </p>
        </section>
    );
}
