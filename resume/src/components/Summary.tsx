
export default function Summary({ summary }: { summary: string }) {
    return (
        <section className="mb-8 print:mb-6">

            <p className="text-gray-700 text-sm leading-relaxed print:text-xs" dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
    );
}
