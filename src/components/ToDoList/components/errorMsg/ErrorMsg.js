import "./ErrorMsg.scss";
export function ErrorMsg({ errorMsg }) {
  return <>{errorMsg && <div className="error-msg">{errorMsg}</div>}</>;
}
