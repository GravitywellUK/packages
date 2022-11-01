import FacebookPixel from "react-facebook-pixel";
import ReactGA from "react-ga4";
import LinkedInTag from "react-linkedin-insight";
import { hotjar } from "react-hotjar";
import TagManager from "react-gtm-module";
import { Cookies } from "react-cookie-consent";

export class GDPR {
  private googleAnalyticsId: string | undefined;
  private metaPixelId: string | undefined;
  private linkedInTagId: string | undefined;
  private hotjarId: number | undefined;
  private googleTagManagerId: string | undefined;

  constructor(
    googleAnalyticsId: string | undefined,
    metaPixelId: string | undefined,
    linkedInTagId: string | undefined,
    hotjarId: number | undefined,
    googleTagManagerId: string | undefined
  ) {
    this.googleAnalyticsId = googleAnalyticsId;
    this.metaPixelId = metaPixelId;
    this.linkedInTagId = linkedInTagId;
    this.hotjarId = hotjarId;
    this.googleTagManagerId = googleTagManagerId;

    // We have to initialize the Meta pixel and revoke consent
    // in order for it to be re-initialized later
    if (metaPixelId) {
      FacebookPixel.init(metaPixelId, undefined, {
        autoConfig: true,
        debug: false
      });
      // Stop this pixel from tracking anything
      FacebookPixel.revokeConsent();
    }
  }

  acceptCookies(): void {
    if (this.googleAnalyticsId) {
      ReactGA.initialize(this.googleAnalyticsId);
    }

    if (this.metaPixelId) {
      FacebookPixel.grantConsent();
      FacebookPixel.fbq("track", "PageView");
    }

    if (this.linkedInTagId) {
      LinkedInTag.init(this.linkedInTagId, "dc", false);
    }

    if (this.hotjarId) {
      hotjar.initialize(this.hotjarId, 6);
    }

    if (this.googleTagManagerId) {
      TagManager.initialize({ gtmId: this.googleTagManagerId });
    }
  }

  declineCookies(): void {
    // Remove GA cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");

    // Remove Meta access
    if (this.metaPixelId) {
      FacebookPixel.revokeConsent();
    }
  }
}