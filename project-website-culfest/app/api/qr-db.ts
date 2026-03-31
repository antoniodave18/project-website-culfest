export interface QRCodeData {
  id: string;
  latitude: number;
  longitude: number;
  expiresAt: number;
}

declare global {
  var activeQRCodes: Record<string, QRCodeData> | undefined;
}

export const activeQRCodes = globalThis.activeQRCodes || {};
if (process.env.NODE_ENV !== 'production') {
  globalThis.activeQRCodes = activeQRCodes;
}
