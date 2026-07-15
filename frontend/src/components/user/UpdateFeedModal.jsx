import FeedCreationForm from "./FeedCreationForm";
export default function UpdateFeedModal({ feedDataToUpdate, closeEditModal }) {
  const showModalCss = {
    display: "block",
    backgroundColor: "#0000005c",
    top: "-40px",
  };

  return (
    <div className="modal show" tabIndex="-1" style={showModalCss}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-end">
              <button
                type="button"
                className="btn-close"
                onClick={closeEditModal}
              ></button>
            </div>
            <FeedCreationForm
              key={feedDataToUpdate?.id}
              feedDataToUpdate={feedDataToUpdate}
              actionType="update"
              closeEditModal={closeEditModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
