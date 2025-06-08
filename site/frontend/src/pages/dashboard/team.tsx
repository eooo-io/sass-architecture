import { withAuth } from '@/components/auth/withAuth';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Dialog } from '@headlessui/react';
import { EnvelopeIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

const teamMembers = [
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Admin',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Editor',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastSeen: '2h ago',
    lastSeenDateTime: '2023-01-23T14:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Member',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    lastSeen: '1h ago',
    lastSeenDateTime: '2023-01-23T15:23Z',
  },
];

const inviteValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  role: Yup.string()
    .oneOf(['Admin', 'Editor', 'Member'], 'Invalid role')
    .required('Role is required'),
});

const Team: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Team Members</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Manage your team members and their access levels.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <UserPlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Invite Member
          </button>
        </div>

        {/* Team member list */}
        <ul role="list" className="divide-y divide-gray-100">
          {teamMembers.map((person) => (
            <li key={person.email} className="flex items-center justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Manage
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Invite modal */}
        <Dialog
          as="div"
          className="relative z-50"
          open={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <EnvelopeIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Invite Team Member
                    </Dialog.Title>
                  </div>
                </div>

                <Formik
                  initialValues={{ email: '', role: 'Member' }}
                  validationSchema={inviteValidationSchema}
                  onSubmit={async (values, { setSubmitting, setStatus }) => {
                    try {
                      // TODO: Implement team member invitation
                      await new Promise(resolve => setTimeout(resolve, 1000));
                      setIsInviteModalOpen(false);
                    } catch (error) {
                      setStatus(error instanceof Error ? error.message : 'An error occurred');
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting, status, errors, touched }) => (
                    <Form className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Enter their email"
                        />
                        {touched.email && errors.email && (
                          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <Field
                          as="select"
                          name="role"
                          id="role"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="Member">Member</option>
                          <option value="Editor">Editor</option>
                          <option value="Admin">Admin</option>
                        </Field>
                        {touched.role && errors.role && (
                          <p className="mt-2 text-sm text-red-600">{errors.role}</p>
                        )}
                      </div>

                      {status && (
                        <div className="rounded-md bg-red-50 p-4">
                          <p className="text-sm text-red-700">{status}</p>
                        </div>
                      )}

                      <div className="mt-6 flex justify-end gap-x-3">
                        <button
                          type="button"
                          onClick={() => setIsInviteModalOpen(false)}
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <LoadingSpinner size="sm" className="text-white" />
                          ) : (
                            'Send Invitation'
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Team);
