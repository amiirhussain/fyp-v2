import useGetUserData from '../../hooks/useGetUserData';

const Dashboard = () => {
  const { userData } = useGetUserData({
    UserEndpoint: 'user/single-user',
  });

  console.log(userData);
  return <div>welcome, {userData.fullName}</div>;
};

export default Dashboard;
