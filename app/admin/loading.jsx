"use client"
import { usePathname } from 'next/navigation'
import LoadingSummary from '../components/loading/LoadingSummary';
import LoadingClients from '../components/loading/LoadingClients';
import LoadingSettings from '../components/loading/LoadingSettings';

export default function Loading() {
    const pathname = usePathname();
    const path = pathname.split("/").pop();
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
            {path == "summary" && <LoadingSummary/>}
            {path == "clients" && <LoadingClients/>}
            {path == "settings" && <LoadingSettings/>}
        </>
    )
}