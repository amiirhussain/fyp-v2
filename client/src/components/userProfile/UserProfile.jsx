import React from 'react';
import { useUserData } from '../../contexts/UserDataContext';
import UserInfo from './UserInfo';
import { Skeleton } from 'antd';
import './userProfile.css';
import UserPersonalDetail from './PersonalDetail';
import UserPreferencesDetail from './PreferencesDetails';

const UserProfile = () => {
  const { loading } = useUserData();
  return (
    <div className="user--section">
      {loading ? <Skeleton active /> : <UserInfo />}
      <div className="user--row">
        {loading ? <Skeleton active /> : <UserPersonalDetail />}
        {loading ? <Skeleton active /> : <UserPreferencesDetail />}
      </div>
    </div>
  );
};

export default UserProfile;
