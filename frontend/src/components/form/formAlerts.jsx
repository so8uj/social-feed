export default function formAlerts({
  alertData = {
    type: "success",
    message: "Alert",
  },
}) {
  return (
    <div className={`alert alert-${alertData.type}`} role="alert">
      {alertData.message}
    </div>
  );
}
