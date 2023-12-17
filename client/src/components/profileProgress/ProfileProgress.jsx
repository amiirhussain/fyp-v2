import { Card, Flex, Progress } from 'antd';
import getProfileProgress from '../../utils/getProfileProgress';

const ProfileProgress = () => {
  const { profileProgress } = getProfileProgress();

  return (
    <Flex align="center" justify="center">
      <Card style={{ width: 300, textAlign: 'center' }}>
        <h2 style={{ marginBottom: 20, color: 'gray' }}>Profile Progress</h2>
        {profileProgress !== null ? (
          <>
            <Progress
              type="circle"
              percent={profileProgress}
              format={(percent) => `${percent.toFixed(2)}%`}
            />
            {profileProgress === 100 ? (
              <p style={{ marginTop: 16 }}>
                Your profile is complete! You can now add an apartment.
              </p>
            ) : (
              <p style={{ marginTop: 16 }}>
                Your profile is not complete. Please update your profile before
                adding an apartment.
              </p>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </Flex>
  );
};

export default ProfileProgress;
