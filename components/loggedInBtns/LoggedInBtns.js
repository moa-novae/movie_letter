import { EuiButton } from "@elastic/eui";
import { useRouter } from "next/router";
export default function ({ logout }) {
  const router = useRouter();
  return (
    <>
      <EuiButton
        className="primary-btn"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Start
      </EuiButton>
      <div className="btn-spacer"></div>
      <EuiButton
        className="secondary-btn"
        onClick={() => {
          logout();
        }}
      >
        Log out
      </EuiButton>
    </>
  );
}
