"use client";
import { serializeCarData } from "@/lib/utils";

import { getAdminTestDrives, updateTestDriveStatus } from '@/actions/admin';
import { cancelTestDrive } from '@/actions/test-drive';
import TestDriveCard from '@/components/test-drive-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { CalendarRange, Loader2, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const TestDriveList = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Custom hooks for API calls
    const {
        loading: fetchingTestDrives,
        fn: fetchTestDrives,
        data: testDrivesData,
        error: testDrivesError,
    } = useFetch(getAdminTestDrives);

    const {
        loading: updatingStatus,
        fn: updateStatusFn,
        data: updateResult,
        error: updateError,
    } = useFetch(updateTestDriveStatus);

    const {
        loading: cancelling,
        fn: cancelTestDriveFn,
        data: cancelResult,
        error: cancelError,
    } = useFetch(cancelTestDrive);


    // Initial fetch and refetch on search/filter changes
    useEffect(() => {
        console.log("Fetching test drives with:", { search, status: statusFilter });
        fetchTestDrives({ search, status: statusFilter });
    }, [search, statusFilter]);

    useEffect(() => {
        console.log("Test drives data:", testDrivesData);
    }, [testDrivesData]);


    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchTestDrives({ search, status: statusFilter });
    };

    // Handle status update
    const handleUpdateStatus = async (bookingId, newStatus) => {
        if (newStatus) {
            await updateStatusFn(bookingId, newStatus);
        }
    };

    // Handle booking cancellation
    const handleCancel = async (bookingId) => {
        await cancelTestDriveFn(bookingId);
    };

    // Handle successful operations
    useEffect(() => {
        if (updateResult?.success) {
            toast.success("Test drive status updated successfully");
            fetchTestDrives({ search, status: statusFilter });
        }
        if (cancelResult?.success) {
            toast.success("Test drive cancelled successfully");
            fetchTestDrives({ search, status: statusFilter });
        }
    }, [updateResult, cancelResult]);

    // Handle errors
    useEffect(() => {
        if (testDrivesError) {
            toast.error("Failed to load test drives");
        }
        if (updateError) {
            toast.error("Failed to update test drive status");
        }
        if (cancelError) {
            toast.error("Failed to cancel test drive");
        }
    }, [testDrivesError, updateError, cancelError]);

    return (
        <div className="space-y-4">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {/* Status Filter */}
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                        className="w-full sm:w-48"
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem>All Statuses</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            <SelectItem value="NO_SHOW">No Show</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Search Form */}
                    <form onSubmit={handleSearchSubmit} className="flex w-full">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search by car or customer..."
                                className="pl-9 w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="ml-2">
                            Search
                        </Button>
                    </form>
                </div>
            </div>

            {/* Test Drives List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarRange className="h-5 w-5" />
                        Test Drive Bookings
                    </CardTitle>
                    <CardDescription>
                        Manage all test drive reservations and update their status
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {fetchingTestDrives && !testDrivesData ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {testDrivesData?.data?.map((booking) => (
                                <div key={booking.id} className="relative">
                                    <TestDriveCard
                                        booking={booking}
                                        onCancel={handleCancel}
                                        showActions={["PENDING", "CONFIRMED"].includes(
                                            booking.status
                                        )}
                                        isAdmin={true}
                                        isCancelling={cancelling}
                                        cancelError={cancelError}
                                        renderStatusSelector={() => (
                                            <Select
                                                value={booking.status}
                                                onValueChange={(value) =>
                                                    handleUpdateStatus(booking.id, value)
                                                }
                                                disabled={updatingStatus}
                                            >
                                                <SelectTrigger className="w-full h-8">
                                                    <SelectValue placeholder="Update Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PENDING">Pending</SelectItem>
                                                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                                    <SelectItem value="NO_SHOW">No Show</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default TestDriveList