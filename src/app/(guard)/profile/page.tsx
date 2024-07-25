'use client';
import { useCurrentUser } from '@/hooks/useUser';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';

export default function ProfilePage() {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) return <LoaderIcon className='animate-spin mt-10'/>;

    return (
        <div className="md:max-w-4xl">
            <div className="p-4 space-y-6 md:p-6 md:flex md:gap-20">
                <header className="space-y-1.5">
                    <div className="flex flex-col items-center space-x-4">
                        <div className="w-20 h-20 md:w-52 md:h-52 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                        <div className="space-y-1.5 text-center mt-4">
                            <h1 className="text-2xl font-bold">
                                {user.name}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </header>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    defaultValue={user.name}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    type="email"
                                    defaultValue={user.email}
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    placeholder="Enter your phone"
                                    type="tel"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">
                            Change Password
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="current-password">
                                    Current Password
                                </Label>
                                <Input
                                    id="current-password"
                                    placeholder="Enter your current password"
                                    type="password"
                                />
                            </div>
                            <div>
                                <Label htmlFor="new-password">
                                    New Password
                                </Label>
                                <Input
                                    id="new-password"
                                    placeholder="Enter your new password"
                                    type="password"
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirm-password">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirm-password"
                                    placeholder="Confirm your new password"
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <Button size="lg">Save</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
