import { getTranslations } from "next-intl/server";
import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Floating WhatsApp button, bottom corner on the end side (left in Arabic). */
export async function WhatsAppFloat() {
  const t = await getTranslations();
  return (
    <a
      href={whatsappLink(t("wa.general"))}
      target="_blank"
      rel="noopener"
      aria-label={t("a11y.whatsapp")}
      className="fixed bottom-5 end-5 z-40 grid size-14 place-items-center rounded-full bg-green-500 text-sand-50 shadow-[0_10px_30px_-8px_rgba(22,63,30,0.6)] transition-transform hover:scale-105 hover:bg-green-700 md:bottom-8 md:end-8"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
