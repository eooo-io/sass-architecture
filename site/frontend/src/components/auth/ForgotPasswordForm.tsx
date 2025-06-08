import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export const ForgotPasswordForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword } = useAuth();

  if (isSuccess) {
    return (
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Password reset email sent</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
              </p>
            </div>
            <div className="mt-4">
              <Link
                href="/login"
                className="text-sm font-medium text-green-800 hover:text-green-700"
              >
                Return to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          await resetPassword(values.email);
          setIsSuccess(true);
        } catch (error) {
          setStatus(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, errors, touched }) => (
        <Form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {status && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{status}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? <LoadingSpinner size="sm" className="text-white" /> : 'Reset password'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
