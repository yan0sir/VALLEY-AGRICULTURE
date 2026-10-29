import { getTranslations } from "next-intl/server";
import { ConsultIcon, InstallIcon, MaintainIcon, PartsIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import type { ServiceKey } from "@/content/types";

export const SERVICES: { key: ServiceKey; Icon: typeof ConsultIcon }[] = [
  { key: "consultation", Icon: ConsultIcon },
  { key: "installation", Icon: InstallIcon },
  { key: "maintenance", Icon: MaintainIcon },
  { key: "aftersales", Icon: PartsIcon },
];

/** Four-up services strip with numbered mono labels. */
export async function ServicesGrid() {
  const t = await getTranslations("service");
  return (
    <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map(({ key, Icon }, i) => (
        <Reveal
          key={key}
          delay={i * 90}
          className="border-b border-line py-10 sm:px-6 sm:[&:nth-child(odd)]:border-e lg:border-e lg:[&:last-child]:border-e-0 lg:first:ps-0"
        >
          <div className="flex items-center justify-between text-green-700">
            <Icon />
            <span className="label text-soil-600">0{i + 1}</span>
          </div>
          <h3 className="mt-8 text-heading font-medium text-green-900">{t(`${key}Title`)}</h3>
          <p className="mt-3 text-soil-600">{t(`${key}Text`)}</p>
        </Reveal>
      ))}
    </div>
  );
}
