import React from 'react';
import RequestDetailClient from './RequestDetailClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminRequestDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <RequestDetailClient id={resolvedParams.id} />;
}
