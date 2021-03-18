import React, { useState } from "react";

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [title, settitle] = useState();
  const [body, setbody] = useState();
  const [overview, setoverview] = useState();

  const changeFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const changeTitleHandler = (event) => {
    settitle(event.target.value);
  };
  const changeBodyHandler = (event) => {
    setbody(event.target.value);
  };
  const changeOverviewHandler = (event) => {
    setoverview(event.target.value);
  };
  const user_id = localStorage.getItem("user_id");
  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("title", title);
    formData.append("image", selectedFile);
    formData.append("overview", overview);
    formData.append("body", body);
    formData.append("votes", 0);

    fetch("https://morning-temple-69567.herokuapp.com/posts", {
      method: "POST",
      headers: {
        //"uid":"\"604fa60313489641f90db5ad\"",
      },
      body: formData,
    })
      .then((response) => console.log(response))
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeFileHandler} />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <p>
        <input
          type="text"
          onChange={changeTitleHandler}
          placeholder="Enter title"
        />
      </p>
      <p>
        <input
          type="text"
          onChange={changeOverviewHandler}
          placeholder="Enter overview"
        />
      </p>
      <p>
        <input
          type="text"
          onChange={changeBodyHandler}
          placeholder="Enter overview"
        />
      </p>
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}
export default FileUploadPage;
