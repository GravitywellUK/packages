import * as React from "react";
import { Asset } from "expo-asset";

/**
 * Use asset loader hook
 *
 * @param assets An array of require("path/to/image")
 */
export const useAssetLoader = (assets: number[]): [boolean, Error | null] => {
  const [ assetsLoaded, setAssetsLoaded ] = React.useState(false);
  const [ assetsError, setAssetsError ] = React.useState<Error | null>(null);

  React.useEffect(() => {
    // Attempt to load the assets
    Asset.loadAsync(assets)
      // On success update the assetsLoaded state
      .then(() => setAssetsLoaded(true))
      // On error update the assetsError state
      .catch(error => setAssetsError(error));
  }, [ assets ]);

  return [ assetsLoaded, assetsError ];
};
