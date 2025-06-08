import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Switch } from '@headlessui/react';
import React, { useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Settings: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    newFeatures: true,
    accountActivity: true,
    upcomingMaintenance: false,
    newsletterUpdates: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    deviceHistory: true,
  });

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSecurityChange = (setting: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 divide-y divide-gray-900/10">
        {/* Notification Settings */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Choose what updates you want to receive.
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="space-y-6">
                {Object.entries(notificationSettings).map(([key, enabled]) => (
                  <Switch.Group key={key} as="div" className="flex items-center justify-between">
                    <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                      <span className="text-sm font-medium leading-6 text-gray-900">
                        {key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-sm text-gray-500">
                        Receive notifications about {key.toLowerCase().replace(/([A-Z])/g, ' $1')}.
                      </span>
                    </Switch.Label>
                    <Switch
                      checked={enabled}
                      onChange={() => handleNotificationChange(key as keyof typeof notificationSettings)}
                      className={classNames(
                        enabled ? 'bg-blue-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Security</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Manage your account security preferences.
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="space-y-6">
                {Object.entries(securitySettings).map(([key, enabled]) => (
                  <Switch.Group key={key} as="div" className="flex items-center justify-between">
                    <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                      <span className="text-sm font-medium leading-6 text-gray-900">
                        {key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-sm text-gray-500">
                        {key === 'twoFactorAuth'
                          ? 'Secure your account with two-factor authentication.'
                          : key === 'loginNotifications'
                          ? 'Get notified about new sign-ins to your account.'
                          : 'Keep track of devices that have logged into your account.'}
                      </span>
                    </Switch.Label>
                    <Switch
                      checked={enabled}
                      onChange={() => handleSecurityChange(key as keyof typeof securitySettings)}
                      className={classNames(
                        enabled ? 'bg-blue-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Settings);
