// Global state manager for Luxafor device status
// This ensures both the main UI and menubar share the same state

export interface DeviceStatus {
  isOnline: boolean;
  currentColor: string;
  lastSeen: Date | null;
  lastAction: string;
}

class LuxaforStateManager {
  private static instance: LuxaforStateManager;
  private status: DeviceStatus = {
    isOnline: false,
    currentColor: 'unknown',
    lastSeen: null,
    lastAction: ''
  };
  private listeners: Set<(status: DeviceStatus) => void> = new Set();

  private constructor() {}

  static getInstance(): LuxaforStateManager {
    if (!LuxaforStateManager.instance) {
      LuxaforStateManager.instance = new LuxaforStateManager();
    }
    return LuxaforStateManager.instance;
  }

  getStatus(): DeviceStatus {
    return { ...this.status };
  }

  updateStatus(newStatus: Partial<DeviceStatus>) {
    this.status = { ...this.status, ...newStatus };
    this.notifyListeners();
  }

  setColor(color: string, action: string) {
    this.status.currentColor = color;
    this.status.lastAction = action;
    this.status.lastSeen = new Date();
    this.status.isOnline = true;
    this.notifyListeners();
  }

  setOnline(online: boolean) {
    this.status.isOnline = online;
    this.status.lastSeen = new Date();
    this.notifyListeners();
  }

  subscribe(listener: (status: DeviceStatus) => void): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.getStatus());
      } catch (error) {
        console.error('Error in state listener:', error);
      }
    });
  }
}

export const luxaforState = LuxaforStateManager.getInstance();
