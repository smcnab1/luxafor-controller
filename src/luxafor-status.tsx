import React, { useState, useEffect } from 'react';
import {
  MenuBarExtra,
  getPreferenceValues,
  showToast,
  Toast,
  Color,
  Icon
} from '@raycast/api';
import { LuxaforService } from './luxafor-service';
import { luxaforState, DeviceStatus } from './luxafor-state';

interface Preferences {
  userId: string;
  apiEndpoint: 'com' | 'co.uk';
}

export default function LuxaforStatus() {
  const [status, setStatus] = useState<DeviceStatus>({
    isOnline: false,
    currentColor: 'unknown',
    lastSeen: null,
    lastAction: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const preferences = getPreferenceValues<Preferences>();
  const luxaforService = new LuxaforService(preferences);

  // Subscribe to global state changes
  useEffect(() => {
    const unsubscribe = luxaforState.subscribe((newStatus) => {
      setStatus(newStatus);
    });

    // Get initial status
    setStatus(luxaforState.getStatus());

    return unsubscribe;
  }, []);

  // Check device status every 30 seconds
  useEffect(() => {
    if (!preferences.userId) return;

    const checkStatus = async () => {
      setIsLoading(true);
      try {
        const deviceInfo = await luxaforService.getDeviceInfo();
        setStatus(deviceInfo);
      } catch (error) {
        setStatus(prev => ({
          ...prev,
          isOnline: false,
          lastSeen: new Date()
        }));
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkStatus();

    // Set up interval - but only refresh if no recent user action
    const interval = setInterval(async () => {
      // Only auto-refresh if we don't have a recent user action
      if (!status.lastAction || status.lastAction.includes('Connection Test')) {
        await checkStatus();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [preferences.userId, status.lastAction]);

  const getStatusIcon = () => {
    if (!preferences.userId) return Icon.QuestionMark;
    if (isLoading) return Icon.Clock;
    if (!status.isOnline) return Icon.XmarkCircle;
    
    // Return colored circle based on current color
    switch (status.currentColor.toLowerCase()) {
      case 'red': return Icon.Circle;
      case 'green': return Icon.Circle;
      case 'blue': return Icon.Circle;
      case 'yellow': return Icon.Circle;
      case 'cyan': return Icon.Circle;
      case 'magenta': return Icon.Circle;
      case 'white': return Icon.Circle;
      case 'off':
      case '000000': return Icon.Power;
      case 'pattern': return Icon.LightBulb;
      default: return Icon.LightBulb;
    }
  };

  const getStatusColor = () => {
    if (!preferences.userId) return Color.SecondaryText;
    if (isLoading) return Color.Blue;
    if (!status.isOnline) return Color.Red;
    
    switch (status.currentColor.toLowerCase()) {
      case 'red': return Color.Red;
      case 'green': return Color.Green;
      case 'blue': return Color.Blue;
      case 'yellow': return Color.Yellow;
      case 'cyan': return Color.Blue;
      case 'magenta': return Color.Purple;
      case 'white': return Color.SecondaryText;
      case 'off':
      case '000000': return Color.SecondaryText;
      case 'pattern': return Color.Orange;
      default: return Color.Orange;
    }
  };

  const getStatusTitle = () => {
    if (!preferences.userId) return 'No User ID';
    if (isLoading) return 'Checking...';
    if (!status.isOnline) return 'Offline';
    
    const colorName = status.currentColor === '000000' ? 'Off' : 
                     status.currentColor === 'pattern' ? 'Pattern' :
                     status.currentColor;
    return `${colorName.charAt(0).toUpperCase() + colorName.slice(1)}`;
  };

  const handleQuickAction = async (action: () => Promise<{ success: boolean; data?: unknown; error?: string }>, actionName: string) => {
    if (!preferences.userId) {
      showToast(Toast.Style.Failure, 'Error', 'Please set your Luxafor User ID in preferences');
      return;
    }

    try {
      const result = await action();
      if (result.success) {
        showToast(Toast.Style.Success, 'Success', `${actionName} executed successfully`);
        // Update status after action
        const newStatus = luxaforService.getCurrentStatus();
        setStatus(prev => ({
          ...prev,
          ...newStatus
        }));
      } else {
        showToast(Toast.Style.Failure, 'Error', result.error || 'Unknown error occurred');
      }
    } catch (error) {
      showToast(Toast.Style.Failure, 'Error', 'Failed to execute action');
    }
  };

  const getColorDisplayName = (color: string) => {
    switch (color.toLowerCase()) {
      case '000000': return 'Off';
      case 'pattern': return 'Pattern';
      default: return color.charAt(0).toUpperCase() + color.slice(1);
    }
  };

  const getStatusSubtitle = () => {
    if (!preferences.userId) return 'Configure in Raycast preferences';
    if (isLoading) return 'Checking device status...';
    if (!status.isOnline) return 'Device not responding';
    
    return status.lastAction || 'Ready';
  };

  return (
    <MenuBarExtra
      icon={{ source: getStatusIcon(), tintColor: getStatusColor() }}
      title={getStatusTitle()}
      isLoading={isLoading}
    >
      {/* Device Status Header */}
      <MenuBarExtra.Section title="Device Status">
        <MenuBarExtra.Item
          title={status.isOnline ? '🟢 Online' : '🔴 Offline'}
          subtitle={status.isOnline ? '(Device is Responding)' : '(Check Connection)'}
          icon={{ source: status.isOnline ? Icon.CheckCircle : Icon.XmarkCircle, tintColor: status.isOnline ? Color.Green : Color.Red }}
        />
        
        <MenuBarExtra.Item
          title={`🎨 Current: Solid ${getColorDisplayName(status.currentColor)}`}
          subtitle={status.currentColor === '000000' ? 'LEDs Off' : 
                   status.currentColor === 'pattern' ? 'Running Pattern' : ''}
          icon={{ source: Icon.Circle, tintColor: getStatusColor() }}
        />
        
        {status.lastAction && (
          <MenuBarExtra.Item
            title={`⏱️ Last Action: ${status.lastAction}`}
            subtitle={status.lastSeen ? `(${status.lastSeen.toLocaleTimeString()})` : ''}
            icon={{ source: Icon.Clock, tintColor: Color.SecondaryText }}
          />
        )}
      </MenuBarExtra.Section>

      {/* Quick Color Actions */}
      <MenuBarExtra.Section title="Quick Colors">
        <MenuBarExtra.Item
          title="⚫ Turn Off"
          subtitle="(Turn all LEDs off)"
          icon={{ source: Icon.Power, tintColor: Color.SecondaryText }}
          onAction={() => handleQuickAction(
            () => luxaforService.turnOff(),
            'Turn Off'
          )}
        />
        
        <MenuBarExtra.Item
          title="🔴 Red"
          subtitle="(Set solid red color)"
          icon={{ source: Icon.Circle, tintColor: Color.Red }}
          onAction={() => handleQuickAction(
            () => luxaforService.setSolidColor('red'),
            'Set Red'
          )}
        />
        
        <MenuBarExtra.Item
          title="🟢 Green"
          subtitle="(Set solid green color)"
          icon={{ source: Icon.Circle, tintColor: Color.Green }}
          onAction={() => handleQuickAction(
            () => luxaforService.setSolidColor('green'),
            'Set Green'
          )}
        />
        
        <MenuBarExtra.Item
          title="🔵 Blue"
          subtitle="(Set solid blue color)"
          icon={{ source: Icon.Circle, tintColor: Color.Blue }}
          onAction={() => handleQuickAction(
            () => luxaforService.setSolidColor('blue'),
            'Set Blue'
          )}
        />
        
        <MenuBarExtra.Item
          title="🟡 Yellow"
          subtitle="(Set solid yellow color)"
          icon={{ source: Icon.Circle, tintColor: Color.Yellow }}
          onAction={() => handleQuickAction(
            () => luxaforService.setSolidColor('yellow'),
            'Set Yellow'
          )}
        />
      </MenuBarExtra.Section>

      {/* Device Management */}
      <MenuBarExtra.Section title="Device Management">
        <MenuBarExtra.Item
          title="🔗 Test Connection"
          subtitle="(Verify device is reachable)"
          icon={{ source: Icon.Wifi, tintColor: Color.Blue }}
          onAction={async () => {
            await handleQuickAction(
              () => luxaforService.testConnection(),
              'Connection Test'
            );
          }}
        />
        
        <MenuBarExtra.Item
          title="🔄 Refresh Status"
          subtitle="(Update device information)"
          icon={{ source: Icon.ArrowClockwise, tintColor: Color.Blue }}
          onAction={async () => {
            setIsLoading(true);
            try {
              const deviceInfo = await luxaforService.forceRefreshStatus();
              setStatus(deviceInfo);
              if (deviceInfo.isOnline) {
                showToast(Toast.Style.Success, 'Status Updated', 'Device is online');
              } else {
                showToast(Toast.Style.Failure, 'Status Updated', 'Device is offline');
              }
            } catch (error) {
              setStatus(prev => ({
                ...prev,
                isOnline: false,
                lastSeen: new Date()
              }));
              showToast(Toast.Style.Failure, 'Status Updated', 'Failed to check status');
            } finally {
              setIsLoading(false);
            }
          }}
        />
      </MenuBarExtra.Section>

      {/* Configuration Info */}
      <MenuBarExtra.Section title="Configuration">
        <MenuBarExtra.Item
          title={`👤 User ID: ${preferences.userId ? '✓ Set' : '✗ Not set'}`}
          subtitle={preferences.userId ? preferences.userId.substring(0, 8) + '...' : 'Required for operation'}
          icon={{ source: Icon.Person, tintColor: preferences.userId ? Color.Green : Color.Red }}
        />
        
        <MenuBarExtra.Item
          title={`🌐 API: api.luxafor.${preferences.apiEndpoint}`}
          subtitle="Webhook endpoint"
          icon={{ source: Icon.Globe, tintColor: Color.Blue }}
        />
      </MenuBarExtra.Section>

      {/* Help Section */}
      <MenuBarExtra.Section title="Help">
        <MenuBarExtra.Item
          title="📖 Open Main Interface"
          subtitle="Full control panel with all options"
          icon={{ source: Icon.Window, tintColor: Color.Orange }}
          onAction={() => {
            // This will open the main control interface
            showToast(Toast.Style.Success, 'Info', 'Use "Control Luxafor" command for full interface');
          }}
        />
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}
