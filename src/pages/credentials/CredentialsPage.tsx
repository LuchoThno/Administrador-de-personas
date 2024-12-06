import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CredentialList } from '../../components/credentials/CredentialList';
import { CredentialPreview } from '../../components/credentials/CredentialPreview';
import { CredentialBatch } from '../../components/credentials/CredentialBatch';

export const CredentialsPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<CredentialList />} />
      <Route path="preview/:employeeId" element={<CredentialPreview />} />
      <Route path="batch" element={<CredentialBatch />} />
    </Routes>
  );
};