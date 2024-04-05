import React, { useState } from "react";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import "./UpdatePage.css";

const uploader = Uploader({
  apiKey: "free", // Get production API keys from Bytescale
});

// Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
const options = { multi: true };

function UpdatePage() {
  const [id, setID] = useState("");
  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  const [nextOwner, setNextOwner] = useState("");
  const [mode, setMode] = useState("Air");

  return (
    <div className="create">
      <form style={{ padding: "20px" }}>
        <h4>Update a new record</h4>
        <label>Product ID</label>
        <input
          type="text"
          required
          value={id}
          onChange={(e) => setID(e.target.value)}
        />

        <label>Organization Name</label>
        <input
          type="text"
          required
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />

        <label>Address</label>
        <textarea
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Next owner</label>
        <input
					type="text"
          required
          value={nextOwner}
          onChange={(e) => setNextOwner(e.target.value)}
        />

        <label>Mode of shipment</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="Air">Air</option>
          <option value="Ocean">Ocean</option>
          <option value="Road">Road</option>
          <option value="Rail">Rail</option>
        </select>

        {/* <label>Mode of shipment</label>
        <form>
          <div className="radio">
            <label>
              <input type="radio" value="option1" checked={true} />
              Air
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="option2" />
              Ocean
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="option3" />
              Express
            </label>
          </div>
        </form> */}

        <UploadDropzone
          uploader={uploader}
          options={options}
          onUpdate={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
          width="600px"
          height="375px"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default UpdatePage;
