import React, { useContext } from "react";
import { Modal, Button, Spinner, Card } from "react-bootstrap";
import { UserContext } from "../../contexts/userContext";
import ImageUploader from "react-images-upload";

const ChangeProfilePicModal = () => {
  let body;
  const {
    userState: { newImgURL, openModalImage },
    closeModalImageFnc,
    onchangeImage,
    updateAvatar,
  } = useContext(UserContext);

  const onDrop = (picture) => {
    let reader = new FileReader();
    let url = reader.readAsDataURL(picture[0]); // for the first picture in this case
    reader.onloadend = async function (e) {
      await onchangeImage(reader.result);
    };
  };

  if (!newImgURL)
    body = (
      <>
        <Modal show={openModalImage} onHide={closeModalImageFnc}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#343a40", color: "white" }}
          >
            <Modal.Title>Update your avatar</Modal.Title>
          </Modal.Header>
          <ImageUploader
            singleImage={true}
            accept="accept=image/*"
            withIcon={true}
            buttonText="Choose images"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif", "jfif", "jpeg"]}
            maxFileSize={5242880}
          />
          <Modal.Footer style={{ backgroundColor: "#343a40", color: "white" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={closeModalImageFnc}>Back</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  if (newImgURL)
    body = (
      <>
        <Modal show={openModalImage} onHide={closeModalImageFnc}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#343a40", color: "white" }}
          >
            <h5> Your new avatar, do you like the change?</h5>
          </Modal.Header>
          <Modal.Body>
            <img
              src={newImgURL}
              alt="avatar src"
              style={{ width: "250px", height: "250px" }}
            />
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#343a40" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "10px",
              }}
            >
              <Button
                onClick={(e) => onchangeImage(null)}
                variant="danger"
                style={{
                  marginRight: "5px",
                }}
              >
                No
              </Button>
              <Button variant="success" onClick={updateAvatar}>
                Yes!
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  return body;
};

export default ChangeProfilePicModal;
