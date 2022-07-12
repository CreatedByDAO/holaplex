const captureCid = /https:\/\/(.*).ipfs.dweb.*$/;
const captureCidArweave = /https:\/\/arweave.net\/(.*)/;
const cleanExt = /\?ext=(.*)/;
const replaceWidth = /\?width=400/;
const captureCidArweaveCache = /https:\/\/arweave.cache.holaplex.com\/(.*)/;
const captureCidIpfsIo = /https:\/\/ipfs.io\/ipfs\/(.*)/;

const captureCidOldHolaplexAssets = /https:\/\/images.holaplex.com\/(.*)/;

export const maybeCDN = (uri: string) => {
  const cdnURI = uri.replace(captureCid, `${process.env.NEXT_PUBLIC_IPFS_CDN_HOST}/$1`);
  return cdnURI ?? uri;
};

export const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  console.log('environmentVariable', {
    environmentVariable,
    unvalidatedEnvironmentVariable,
    // env: process.env,
  });
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(`Couldn't find environment variable: ${environmentVariable}`);
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const crossmintConfig = {
  apiKey: getEnvironmentVariable('NEXT_PUBLIC_CROSSMINT_API_KEY'),
  // 'crossmintnft.f7yunI0q.dY23CUy13M1AA90btdtlD393mNwCpt19',
  clientId: getEnvironmentVariable('NEXT_PUBLIC_CROSSMINT_CLIENT_ID'),
  // 'fec98fec-8281-4c5e-9348-4905ae1d150f',
};

type IMAGE_SIZE =
  | 0 // original size
  | 50
  | 100
  | 200
  | 400
  | 500
  | 600
  | 800
  | 700
  | 900
  | 1000
  | 1100
  | 1200
  | 1300
  | 1400
  | 1500;

export const imgOpt = (uri?: string, width: IMAGE_SIZE = 0) => {
  if (!uri) {
    return uri;
  } else if (uri.includes('holaplex.tools')) {
    return uri.replace(replaceWidth, `?width=${width}`);
  } else {
    let cdnURI = uri
      .replace(':443', '')
      .replace('www.', '')
      .replace(cleanExt, '')
      .replace(captureCid, `${process.env.NEXT_PUBLIC_IMAGE_CDN_HOST}/ipfs/$1`)
      .replace(captureCidOldHolaplexAssets, `${process.env.NEXT_PUBLIC_IMAGE_CDN_HOST}/ipfs/$1`)
      .replace(captureCidArweave, `${process.env.NEXT_PUBLIC_IMAGE_CDN_HOST}/arweave/$1`)
      .replace(captureCidArweaveCache, `${process.env.NEXT_PUBLIC_IMAGE_CDN_HOST}/arweave/$1`)
      .replace(captureCidIpfsIo, `${process.env.NEXT_PUBLIC_IMAGE_CDN_HOST}/ipfs/$1`);
    cdnURI = cdnURI + `?width=${width}`;

    return cdnURI ?? uri;
  }
};

export const RUST_ISO_UTC_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export function isTouchScreenOnly(): boolean {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}
