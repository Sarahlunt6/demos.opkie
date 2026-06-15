import Script from "next/script";
import { hubConfig } from "@/lib/hub.config";

/**
 * Optional Google Tag Manager loader. Loads only when `analytics.gtmId` is set
 * in hub.config.ts, `afterInteractive` so it never blocks the first paint
 * (PRD 8). Vercel Analytics is the primary tracker; this is here so the config
 * field is live for teams that prefer GTM.
 */
export function GtmScript() {
  const id = hubConfig.analytics.gtmId;
  if (!id) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
    </Script>
  );
}
