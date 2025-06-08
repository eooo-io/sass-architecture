import withAuth from '@/components/auth/withAuth';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import React from 'react';

const stats = [
  {
    name: 'Total Customers',
    value: '71,897',
    change: '+4.75%',
    changeType: 'positive',
  },
  {
    name: 'Avg. Revenue',
    value: '$58.16',
    change: '+8.32%',
    changeType: 'positive',
  },
  {
    name: 'Active Users',
    value: '24,500',
    change: '-3.24%',
    changeType: 'negative',
  },
  {
    name: 'Conversion Rate',
    value: '4.05%',
    change: '+2.18%',
    changeType: 'positive',
  },
];

const activity = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5',
    },
    type: 'comment',
    message: 'Commented on',
    target: 'Marketing Campaign Review',
    date: '1h ago',
  },
  {
    user: {
      name: 'Dries Vincent',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    },
    type: 'assignment',
    message: 'Assigned',
    target: 'Q4 Goals Review',
    date: '2h ago',
  },
  {
    user: {
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    },
    type: 'tags',
    message: 'Added tags',
    target: 'Product Update',
    date: '3h ago',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    type: 'completed',
    message: 'Completed',
    target: 'Brand Guidelines Update',
    date: '3h ago',
  },
];

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                  {stat.value}
                </div>

                <div
                  className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0
                    ${
                      stat.changeType === 'positive'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                >
                  {stat.changeType === 'positive' ? (
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
                  {stat.change}
                </div>
              </dd>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Activity Feed</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
              {activity.map((item, itemIdx) => (
                <li key={itemIdx} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={item.user.imageUrl}
                      alt=""
                      className="h-8 w-8 flex-none rounded-full bg-gray-50"
                    />
                    <div className="flex-auto">
                      <div className="flex items-baseline gap-x-2">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {item.user.name}
                        </p>
                        <p className="text-xs leading-5 text-gray-500">{item.date}</p>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {item.message}{' '}
                        <span className="font-medium text-gray-900">{item.target}</span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Dashboard);
