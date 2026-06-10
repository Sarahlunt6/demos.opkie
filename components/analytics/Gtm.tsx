import Script from "next/script";
import { siteConfig } from "@/lib/site.config";

/**
 * Google Tag Manager, loaded afterInteractive so it never blocks render
 * (PRD 8). Renders nothing until a gtmId is set in config, keeping the
 * template free of third-party scripts by default.
 */
export function Gtm() {
  const { gtmId } = siteConfig.analytics;
  if (!gtmId) return null;

  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}
