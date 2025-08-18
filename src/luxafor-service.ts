import axios from 'axios';
import { luxaforState } from './luxafor-state';

export interface LuxaforConfig {
  userId: string;
  apiEndpoint: 'com' | 'co.uk';
}

export interface DeviceStatus {
  isOnline: boolean;
  currentColor: string;
  lastSeen: Date | null;
  lastAction: string;
}

export class LuxaforService {
  private config: LuxaforConfig;
  private baseUrl: string;
  private isRefreshing: boolean = false;

  constructor(config: LuxaforConfig) {
    this.config = config;
    this.baseUrl = `https://api.luxafor.${config.apiEndpoint}/webhook/v1/actions`;
  }

  private async makeRequest(endpoint: string, actionFields: Record<string, string>) {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, {
        userId: this.config.userId,
        actionFields
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Update current color based on action
      this.updateCurrentColor(endpoint, actionFields);
      
      return { success: true, data: response.data };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  }

  private updateCurrentColor(endpoint: string, actionFields: Record<string, string>) {
    if (endpoint === 'solid_color') {
      if (actionFields.color === 'custom') {
        luxaforState.setColor(actionFields.custom_color, `Set custom color ${actionFields.custom_color}`);
      } else {
        luxaforState.setColor(actionFields.color, `Set ${actionFields.color}`);
      }
    } else if (endpoint === 'blink') {
      luxaforState.setColor(actionFields.color, `Blink ${actionFields.color}`);
    } else if (endpoint === 'pattern') {
      luxaforState.setColor('pattern', `Pattern ${actionFields.pattern}`);
    }
  }

  // Get current device status
  getCurrentStatus(): DeviceStatus {
    return luxaforState.getStatus();
  }

  // Get last action performed
  getLastAction(): string {
    return luxaforState.getStatus().lastAction;
  }

  // Get current color
  getCurrentColor(): string {
    return luxaforState.getStatus().currentColor;
  }

  // Turn device off (black color)
  async turnOff() {
    luxaforState.setColor('000000', 'Turn Off');
    return this.makeRequest('solid_color', {
      color: 'custom',
      custom_color: '000000'
    });
  }

  // Set solid color
  async setSolidColor(color: 'red' | 'green' | 'yellow' | 'blue' | 'white' | 'cyan' | 'magenta') {
    luxaforState.setColor(color, `Set ${color}`);
    return this.makeRequest('solid_color', {
      color
    });
  }

  // Set custom hex color
  async setCustomColor(hexColor: string) {
    // Ensure hex color is 6 characters and valid
    const cleanHex = hexColor.replace('#', '').padEnd(6, '0').substring(0, 6);
    
    luxaforState.setColor(cleanHex, `Set custom color ${cleanHex}`);
    
    return this.makeRequest('solid_color', {
      color: 'custom',
      custom_color: cleanHex
    });
  }

  // Blink with color
  async blink(color: 'red' | 'green' | 'yellow' | 'blue' | 'white' | 'cyan' | 'magenta') {
    luxaforState.setColor(color, `Blink ${color}`);
    return this.makeRequest('blink', {
      color
    });
  }

  // Set pattern
  async setPattern(pattern: 'police' | 'traffic lights' | 'random 1' | 'random 2' | 'random 3' | 'random 4' | 'random 5') {
    luxaforState.setColor('pattern', `Pattern ${pattern}`);
    return this.makeRequest('pattern', {
      pattern
    });
  }

  // Test connection (but don't update color state)
  async testConnection() {
    luxaforState.updateStatus({ lastAction: 'Connection Test' });
    return this.makeRequest('solid_color', {
      color: 'red'
    });
  }

  // Get device info (for status display) - only updates if not recently set by user
  async getDeviceInfo() {
    try {
      // If we have a recent user action, don't overwrite it with API call
      const currentStatus = luxaforState.getStatus();
      if (currentStatus.lastAction && !this.isRefreshing) {
        return currentStatus;
      }

      // Only make API call if we're refreshing or don't have recent state
      this.isRefreshing = true;
      const result = await this.testConnection();
      this.isRefreshing = false;
      
      if (result.success) {
        // Only update color if we don't have a recent user action
        if (!currentStatus.lastAction || this.isRefreshing) {
          luxaforState.setColor('red', 'Connection Test');
        }
        luxaforState.setOnline(true);
        return luxaforState.getStatus();
      } else {
        luxaforState.setOnline(false);
        return luxaforState.getStatus();
      }
    } catch (error) {
      this.isRefreshing = false;
      luxaforState.setOnline(false);
      return luxaforState.getStatus();
    }
  }

  // Force refresh status (for manual refresh button)
  async forceRefreshStatus() {
    this.isRefreshing = true;
    try {
      const result = await this.testConnection();
      if (result.success) {
        // Only update if we don't have recent user action
        const currentStatus = luxaforState.getStatus();
        if (!currentStatus.lastAction) {
          luxaforState.setColor('red', 'Connection Test');
        }
        luxaforState.setOnline(true);
        return luxaforState.getStatus();
      } else {
        luxaforState.setOnline(false);
        return luxaforState.getStatus();
      }
    } catch (error) {
      luxaforState.setOnline(false);
      return luxaforState.getStatus();
    } finally {
      this.isRefreshing = false;
    }
  }
}
