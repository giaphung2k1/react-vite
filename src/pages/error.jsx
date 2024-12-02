import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Result
        status="403"
        title="403"
        subTitle={error.statusText || error.message}
        extra={<Button type="primary"><Link to="/">Back to Home Page</Link></Button>}
      />

    </div>
  );
}
export default ErrorPage;