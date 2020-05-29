import { EuiButton } from "@elastic/eui";
import { useRouter } from "next/router";
import style from "./style.module.scss";
export default function ({ logout }) {
  const router = useRouter();
  return (
    <>
      <EuiButton
        className={style["primary-btn"]}
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Start
      </EuiButton>
      <div className={style["btn-spacer"]}></div>
      <EuiButton
        className={style["secondary-btn"]}
        onClick={() => {
          logout();
        }}
      >
        Log out
      </EuiButton>
    </>
  );
}
