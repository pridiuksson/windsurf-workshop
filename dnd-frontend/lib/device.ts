// Device management utilities

export function generateDeviceFingerprint(): string {
  // Generate a unique fingerprint based on browser characteristics
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
    Math.random().toString(36).substring(2, 15)
  ].join('|');
  
  return btoa(fingerprint).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
}

export function getDeviceId(): string {
  // Check if device ID exists in localStorage
  let deviceId = localStorage.getItem('dnd-device-id');
  
  if (!deviceId) {
    // Generate new device ID
    deviceId = 'device-' + generateDeviceFingerprint() + '-' + Date.now();
    localStorage.setItem('dnd-device-id', deviceId);
  }
  
  return deviceId;
}

export function storePlayerSession(playerId: string): void {
  localStorage.setItem('dnd-player-id', playerId);
  localStorage.setItem('dnd-last-login', new Date().toISOString());
}

export function getPlayerSession(): string | null {
  const playerId = localStorage.getItem('dnd-player-id');
  const lastLogin = localStorage.getItem('dnd-last-login');
  
  // Clear session if it's older than 24 hours
  if (playerId && lastLogin) {
    const loginTime = new Date(lastLogin).getTime();
    const now = new Date().getTime();
    const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursSinceLogin > 24) {
      clearPlayerSession();
      return null;
    }
  }
  
  return playerId;
}

export function clearPlayerSession(): void {
  localStorage.removeItem('dnd-player-id');
  localStorage.removeItem('dnd-last-login');
}

export function isSameDevice(deviceId: string): boolean {
  return getDeviceId() === deviceId;
}
