import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** OAD-style 50/50 block: image on one side, story on the other. */
export function Split({
  image,
  eyebrow,
  title,
  children,
  flip = false,
  tone = "light",
  imageAlt = "",
}: {
  image: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  flip?: boolean;
  tone?: "light" | "sand";
  imageAlt?: string;
}) {
  return (
    <section className={tone === "sand" ? "bg-sand-200" : ""}>
      <div className="grid md:grid-cols-2">
        <div className={`relative min-h-[320px] md:min-h-[620px] ${flip ? "md:order-2" : ""}`}>
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <Reveal className="flex flex-col justify-center px-4 py-16 sm:px-8 md:px-12 md:py-24 lg:px-20">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="display mt-6 max-w-xl text-display-m text-green-900">{title}</h2>
          <div className="mt-6 max-w-xl space-y-5 text-body-l text-soil-600">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
