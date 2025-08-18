import React, { useState } from 'react';
import {
  ActionPanel,
  Action,
  List,
  Icon,
  Color,
  getPreferenceValues,
  showToast,
  Toast,
  confirmAlert,
  Alert
} from '@raycast/api';
import { LuxaforService } from './luxafor-service';
import { luxaforState } from './luxafor-state';

interface Preferences {
  userId: string;
  apiEndpoint: 'com' | 'co.uk';
}

export default function ControlLuxafor() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');
  
  const preferences = getPreferenceValues<Preferences>();
  const luxaforService = new LuxaforService(preferences);

  const handleAction = async (action: () => Promise<any>, actionName: string) => {
    if (!preferences.userId) {
      showToast(Toast.Style.Failure, 'Error', 'Please set your Luxafor User ID in preferences');
      return;
    }

    setIsLoading(true);
    try {
      const result = await action();
      if (result.success) {
        setLastAction(actionName);
        showToast(Toast.Style.Success, 'Success', `${actionName} executed successfully`);
        
        // Update global state
        const currentStatus = luxaforState.getStatus();
        setLastAction(currentStatus.lastAction);
      } else {
        showToast(Toast.Style.Failure, 'Error', result.error || 'Unknown error occurred');
      }
    } catch (error) {
      showToast(Toast.Style.Failure, 'Error', 'Failed to execute action');
    } finally {
      setIsLoading(false);
    }
  };

  const basicColors = [
    { name: 'Red', color: 'red', icon: Icon.Circle, tintColor: Color.Red },
    { name: 'Green', color: 'green', icon: Icon.Circle, tintColor: Color.Green },
    { name: 'Blue', color: 'blue', icon: Icon.Circle, tintColor: Color.Blue },
    { name: 'Yellow', color: 'yellow', icon: Icon.Circle, tintColor: Color.Yellow },
    { name: 'Cyan', color: 'cyan', icon: Icon.Circle, tintColor: Color.Blue },
    { name: 'Magenta', color: 'magenta', icon: Icon.Circle, tintColor: Color.Purple },
    { name: 'White', color: 'white', icon: Icon.Circle, tintColor: Color.SecondaryText },
  ];

  const patterns = [
    { name: 'Police', pattern: 'police', icon: Icon.Exclamationmark2, tintColor: Color.Red },
    { name: 'Traffic Lights', pattern: 'traffic lights', icon: Icon.LightBulb, tintColor: Color.Yellow },
    { name: 'Random 1', pattern: 'random 1', icon: Icon.Shuffle, tintColor: Color.Blue },
    { name: 'Random 2', pattern: 'random 2', icon: Icon.Shuffle, tintColor: Color.Green },
    { name: 'Random 3', pattern: 'random 3', icon: Icon.Shuffle, tintColor: Color.Orange },
    { name: 'Random 4', pattern: 'random 4', icon: Icon.Shuffle, tintColor: Color.Purple },
    { name: 'Random 5', pattern: 'random 5', icon: Icon.Shuffle, tintColor: Color.Purple },
  ];

  const testConnection = async () => {
    await confirmAlert({
      title: 'Test Connection',
      message: 'This will briefly turn your Luxafor device red to test the connection. Continue?',
      primaryAction: {
        title: 'Test',
        style: Alert.ActionStyle.Default,
      },
    });

    await handleAction(
      () => luxaforService.testConnection(),
      'Connection Test'
    );
  };

  return (
    <List isLoading={isLoading}>
      <List.Section title="Basic Controls" subtitle="Turn device on/off and set basic colors">
        <List.Item
          title="Turn Off"
          subtitle="Turn all LEDs off"
          icon={{ source: Icon.Power, tintColor: Color.SecondaryText }}
          actions={
            <ActionPanel>
              <Action
                title="Turn Off"
                icon={Icon.Power}
                onAction={() => handleAction(
                  () => luxaforService.turnOff(),
                  'Turn Off'
                )}
              />
            </ActionPanel>
          }
        />
        
        {basicColors.map((colorItem) => (
          <List.Item
            key={colorItem.color}
            title={colorItem.name}
            subtitle={`Set ${colorItem.name.toLowerCase()} color`}
            icon={{ source: colorItem.icon, tintColor: colorItem.tintColor }}
            actions={
              <ActionPanel>
                <Action
                  title={`Set ${colorItem.name}`}
                  icon={colorItem.icon}
                  onAction={() => handleAction(
                    () => luxaforService.setSolidColor(colorItem.color as any),
                    `Set ${colorItem.name}`
                  )}
                />
                <Action
                  title={`Blink ${colorItem.name}`}
                  icon={Icon.LightBulb}
                  onAction={() => handleAction(
                    () => luxaforService.blink(colorItem.color as any),
                    `Blink ${colorItem.name}`
                  )}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>

      <List.Section title="Patterns" subtitle="Set predefined light patterns">
        {patterns.map((patternItem) => (
          <List.Item
            key={patternItem.pattern}
            title={patternItem.name}
            subtitle={`Start ${patternItem.name.toLowerCase()} pattern`}
            icon={{ source: patternItem.icon, tintColor: patternItem.tintColor }}
            actions={
              <ActionPanel>
                <Action
                  title={`Start ${patternItem.name}`}
                  icon={patternItem.icon}
                  onAction={() => handleAction(
                    () => luxaforService.setPattern(patternItem.pattern as any),
                    `Start ${patternItem.name}`
                  )}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>

      <List.Section title="Utilities" subtitle="Additional tools and settings">
        <List.Item
          title="Test Connection"
          subtitle="Test if your Luxafor device is reachable"
          icon={{ source: Icon.Wifi, tintColor: Color.Blue }}
          actions={
            <ActionPanel>
              <Action
                title="Test Connection"
                icon={Icon.Wifi}
                onAction={testConnection}
              />
            </ActionPanel>
          }
        />
        
        {lastAction && (
          <List.Item
            title="Last Action"
            subtitle={lastAction}
            icon={{ source: Icon.Clock, tintColor: Color.Green }}
          />
        )}
      </List.Section>

      <List.Section title="Configuration" subtitle="Current settings">
        <List.Item
          title="User ID"
          subtitle={preferences.userId || 'Not set'}
          icon={{ source: Icon.Person, tintColor: preferences.userId ? Color.Green : Color.Red }}
        />
        <List.Item
          title="API Endpoint"
          subtitle={`api.luxafor.${preferences.apiEndpoint}`}
          icon={{ source: Icon.Globe, tintColor: Color.Blue }}
        />
      </List.Section>
    </List>
  );
}
