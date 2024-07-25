'use client';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { PhoneNumberResource } from '@clerk/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function ClerkOTPFlow() {
  const { isLoaded, user } = useUser();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [phoneObj, setPhoneObj] = useState<PhoneNumberResource | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isLoaded) return null;

  if (isLoaded && !user?.id) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          You must be logged in to access this page
        </AlertDescription>
      </Alert>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await user.createPhoneNumber({ phoneNumber: phone });
      await user.reload();
      const phoneNumber = user.phoneNumbers.find((a) => a.id === res.id);
      setPhoneObj(phoneNumber);
      await phoneNumber?.prepareVerification();
      setIsVerifying(true);
    } catch (err) {
      setError('Failed to add phone number. Please try again.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const phoneVerifyAttempt = await phoneObj?.attemptVerification({ code });
      if (phoneVerifyAttempt?.verification.status === 'verified') {
        setSuccessful(true);
      } else {
        setError('Verification failed. Please check the code and try again.');
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  if (successful) {
    return (
      <Card className="w-[350px] mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-center text-green-600">Success!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Your phone number has been successfully added and verified.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>{isVerifying ? 'Verify Phone' : 'Add Phone'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={isVerifying ? verifyCode : handleSubmit}>
          {isVerifying ? (
            <div className="space-y-4">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Enter verification code
              </label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                required
              />
            </div>
          ) : (
            <div className="space-y-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Enter phone number
              </label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 555-5555"
                required
              />
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <CardFooter className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isVerifying ? 'Verify' : 'Continue'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
