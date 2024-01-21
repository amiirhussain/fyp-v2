import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/user/${param.id}/verify/${param.token}`,
          {
            method: 'GET',
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setValidUrl(true);
        } else {
          setValidUrl(false);
        }
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };

    verifyEmailUrl();
  }, [param]);

  return (
    <>
      {validUrl ? (
        <Result
          status="success"
          title="Email verified successfully"
          extra={[
            <Link to="/login" key="login">
              <Button type="primary">Login</Button>
            </Link>,
          ]}
        />
      ) : (
        <Result status="404" title="404 Not Found" />
      )}
    </>
  );
};

export default EmailVerify;
