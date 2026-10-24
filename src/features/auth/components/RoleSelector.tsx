import React from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';
import { AUTH_TEXT } from '@/constants/constants';
import { RoleSelectorProps } from '@/types';
import {
  RoleSelectorContainer,
  RoleSelectorTab,
  AlertBanner,
} from '../style';

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  role,
  onSelectRole,
  showNotice = false,
}) => {
  return (
    <>
      <RoleSelectorContainer role="tablist" aria-label={AUTH_TEXT.sideEyebrow}>
        <RoleSelectorTab
          type="button"
          role="tab"
          aria-selected={role === 'patient'}
          $active={role === 'patient'}
          onClick={() => onSelectRole('patient')}
        >
          <UserCheck size={15} />
          <span>{AUTH_TEXT.rolePatient}</span>
        </RoleSelectorTab>
        <RoleSelectorTab
          type="button"
          role="tab"
          aria-selected={role === 'admin'}
          $active={role === 'admin'}
          onClick={() => onSelectRole('admin')}
        >
          <ShieldCheck size={15} />
          <span>{AUTH_TEXT.roleAdmin}</span>
        </RoleSelectorTab>
      </RoleSelectorContainer>

      {showNotice && (
        <AlertBanner $variant="info" role="status">
          <ShieldCheck size={18} />
          <span>{AUTH_TEXT.adminStaffNotice}</span>
        </AlertBanner>
      )}
    </>
  );
};
