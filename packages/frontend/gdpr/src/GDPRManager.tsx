import React, { useMemo } from "react";
import CookieConsent from "react-cookie-consent";
import { CookieConsentProps } from "react-cookie-consent/dist/CookieConsent.props";

import { GDPR } from "./gdpr";

interface GDPRProps extends Omit<CookieConsentProps, "onAccept" | "onDecline" | "enableDeclineButton"> {
  googleAnalyticsId: string | undefined;
  metaPixelId: string | undefined;
  linkedInTagId: string | undefined;
  hotjarId: number | undefined;
  googleTagManagerId: string | undefined;
}

export const GDPRManager: React.FC<GDPRProps> = ({
  googleAnalyticsId, metaPixelId, linkedInTagId, hotjarId, googleTagManagerId, children, ...rest
}) => {
  const gdprModule: GDPR = useMemo(() => new GDPR(googleAnalyticsId, metaPixelId, linkedInTagId, hotjarId, googleTagManagerId), [
    googleAnalyticsId,
    googleTagManagerId,
    hotjarId,
    linkedInTagId,
    metaPixelId
  ]);

  return (
    <CookieConsent
      enableDeclineButton
      onAccept={gdprModule.acceptCookies}
      onDecline={gdprModule.declineCookies}
      {...rest}
    >
      {children}
    </CookieConsent>
  );
};