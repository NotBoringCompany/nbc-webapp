import { useMoralis } from 'react-moralis';
import { useCallback, useEffect, useState } from 'react';
import AccountMainLayout from '@/components/Account/MainLayout';
import DashboardLayout from '@/components/Account/DashboardLayout';

const Dashboard = () => {
    const { user } = useMoralis();
    const [email, setEmail] = useState(null);
    const getEmail = useCallback(() => {
        if (user?.attributes?.email) {
            setEmail(user.attributes.email);
        }
    }, [user])


    useEffect(() => {
        if (!email) {
            getEmail();
        }
    
    }, [email, getEmail])

    return (
        <AccountMainLayout email={user?.attributes?.email} ethAddress={user?.attributes?.ethAddress}>
            <DashboardLayout />
        </AccountMainLayout>
    )
}

export default Dashboard;