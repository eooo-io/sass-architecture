import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import React from 'react';

const metrics = [
  {
    name: 'Total Revenue',
    value: '$405,091.00',
    change: '+4.75%',
    changeType: 'positive',
  },
  {
    name: 'Active Subscriptions',
    value: '1,271',
    change: '+10.15%',
    changeType: 'positive',
  },
  {
    name: 'Churn Rate',
    value: '2.3%',
    change: '-0.5%',
    changeType: 'positive',
  },
  {
    name: 'Average Revenue Per User',
    value: '$318.72',
    change: '-3.24%',
    changeType: 'negative',
  },
];

const Analytics: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">{metric.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                  {metric.value}
                </div>

                <div
                  className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0
                    ${
                      metric.changeType === 'positive'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                >
                  {metric.changeType === 'positive' ? (
                    <ArrowUpIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}
                  {metric.change}
                </div>
              </dd>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Revenue Over Time</h3>
                <div className="flex items-center space-x-4">
                  <select className="rounded-md border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <div className="h-[300px] w-full bg-gray-50 flex items-center justify-center text-gray-500">
                  Chart placeholder - Revenue data visualization will go here
                </div>
              </div>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">User Growth</h3>
                <div className="flex items-center space-x-4">
                  <select className="rounded-md border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <div className="h-[300px] w-full bg-gray-50 flex items-center justify-center text-gray-500">
                  Chart placeholder - User growth data visualization will go here
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Distribution */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Subscription Plans</h3>
              </div>
              <div className="mt-6">
                <div className="h-[300px] w-full bg-gray-50 flex items-center justify-center text-gray-500">
                  Chart placeholder - Subscription plan distribution will go here
                </div>
              </div>
            </div>
          </div>

          {/* Churn Analysis */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Churn Analysis</h3>
              </div>
              <div className="mt-6">
                <div className="h-[300px] w-full bg-gray-50 flex items-center justify-center text-gray-500">
                  Chart placeholder - Churn analysis data will go here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Analytics);
