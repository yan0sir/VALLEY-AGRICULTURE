import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Page opener: eyebrow, large title, optional intro. */
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="mb-12 border-b border-line md:mb-16">
      <Reveal className="site-container pt-12 pb-14 md:pt-20 md:pb-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display mt-6 max-w-5xl text-display-l text-green-900">{title}</h1>
        {intro && <p className="mt-8 max-w-3xl text-body-l text-soil-600">{intro}</p>}
        {children}
      </Reveal>
    </section>
  );
}
