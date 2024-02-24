'use client';

import {PageLayout} from '@primer/react'


export default function Page({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <PageLayout>
                <PageLayout.Header>
                    
                </PageLayout.Header>
                <PageLayout.Content>
                    {children}
                </PageLayout.Content>
                <PageLayout.Footer>

                </PageLayout.Footer>
            </PageLayout>
        </>
    );
}