'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Loading...</p>;
    }
    console.log('Session: ', session)
    if (session) {
        return (
            <>
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }

    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}
