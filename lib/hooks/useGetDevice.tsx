import { useEffect, useState } from 'react';

interface Device {
  id: string;
  isDefault: boolean;
  label: string;
}
export const useGetDevice = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const getDevices = async () => {
      if (!navigator.mediaDevices) return;
      const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
        (device) => device.kind === 'audioinput'
      );

      console.log('Available audio input devices:', devices);

      if (devices.length === 0) {
        console.error('No audio input devices found.');
        return;
      }

      setDevices(
        devices.map((device) => ({
          isDefault: device.label.toLocaleLowerCase().includes('default'),
          id: device.deviceId,
          label: device.label || `Device ${device.deviceId}`,
        }))
      );
    };
    getDevices();
  }, []);

  return { devices, selectedDeviceId, setSelectedDeviceId };
};
