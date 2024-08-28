import { FaFolderPlus, FaFileMedical, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

const Home = () => {

  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newName, setNewName] = useState("");
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCreateSubfolder = (index) => {
    setIsCreatingFolder(true);
    setIsCreatingFile(false);
    setActiveIndex(index);
  };

  const handleCreateSubfile = (index) => {
    setIsCreatingFile(true);
    setIsCreatingFolder(false);
    setActiveIndex(index);
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCreatingFolder) {
      setFolders([...folders, newName]);
    } else if (isCreatingFile) {
      setFiles([...files, newName]);
    }
    setNewName("");
    setIsCreatingFolder(false);
    setIsCreatingFile(false);
  };

  const handleFolderClick = () => {
    setIsCreatingFolder(false);
    setIsCreatingFile(false);
  };

  return (
    <div className="ml-[100px] mt-9">
      <h1 className="flex item-center justify-center text-3xl">
        Explore this file explorer
      </h1>

      <div className="flex border rounded-lg justify-between bg-[#222E3E] items-center w-[400px] p-3 mt-8">
        <div className="flex items-center gap-3 text-white text-xl">
          <FaFolderPlus />
          <h4>Root</h4>
        </div>
        <div className="flex gap-2 text-[#A4ADBA] cursor-pointer text-xl">
          <FaFolderPlus onClick={() => handleCreateSubfolder("root")} />
          <FaFileMedical onClick={() => handleCreateSubfile("root")} />
          <FaEdit />
          <AiFillDelete />
        </div>
      </div>

      {activeIndex === "root" && (isCreatingFolder || isCreatingFile) ? (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center w-[400px] p-3 ml-5 mt-2">
            <div className="flex items-center gap-1 text-lg">
              {isCreatingFolder ? <FaFolderPlus /> : <FaFileMedical />}
            </div>
            <input
              type="text"
              placeholder={isCreatingFolder ? "New folder name" : "New file name"}
              value={newName}
              onChange={handleInputChange}
              className="focus:outline-none border rounded-lg bg-white px-2"
              autoFocus
            />
            <button type="submit" className="hidden">Submit</button>
          </div>
        </form>
      ) : null}

      <div>
        {folders.map((folderName, index) => (
          <div key={`folder-${index}`}>
            <div
              className="flex border rounded-lg justify-between bg-[#222E3E] items-center w-[400px] p-3 ml-5 mt-2"
            >
              <div
                className="flex items-center gap-3 text-white"
                onClick={() => handleFolderClick(folderName)}
              >
                <FaFolderPlus />
                <h4>{folderName}</h4>
              </div>
              <div className="flex gap-2 text-[#A4ADBA] cursor-pointer">
                <FaFolderPlus onClick={() => handleCreateSubfolder(index)} />
                <FaFileMedical onClick={() => handleCreateSubfile(index)} />
                <FaEdit />
                <AiFillDelete />
              </div>
            </div>
            {activeIndex === index && (isCreatingFolder || isCreatingFile) ? (
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2 items-center w-[400px] p-3 ml-5 mt-2">
                  <div className="flex items-center gap-1 text-lg">
                    {isCreatingFolder ? <FaFolderPlus /> : <FaFileMedical />}
                  </div>
                  <input
                    type="text"
                    placeholder={isCreatingFolder ? "New folder name" : "New file name"}
                    value={newName}
                    onChange={handleInputChange}
                    className="focus:outline-none border rounded-lg bg-white px-2"
                    autoFocus
                  />
                  <button type="submit" className="hidden">Submit</button>
                </div>
              </form>
            ) : null}
          </div>
        ))}

        {files.map((fileName, index) => (
          <div key={`file-${index}`}>
            <div className="flex border rounded-lg justify-between bg-[#222E3E] items-center w-[400px] p-3 ml-5 mt-2">
              <div className="flex items-center gap-3 text-white">
                <FaFileMedical />
                <h4>{fileName}</h4>
              </div>
              <div className="flex gap-2 text-[#A4ADBA] cursor-pointer">
                <FaEdit />
                <AiFillDelete />
              </div>
            </div>
            {activeIndex === index && (isCreatingFolder || isCreatingFile) ? (
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2 items-center w-[400px] p-3 ml-5 mt-2">
                  <div className="flex items-center gap-1 text-lg">
                    {isCreatingFolder ? <FaFolderPlus /> : <FaFileMedical />}
                  </div>
                  <input
                    type="text"
                    placeholder={isCreatingFolder ? "New folder name" : "New file name"}
                    value={newName}
                    onChange={handleInputChange}
                    className="focus:outline-none border rounded-lg bg-white px-2"
                    autoFocus
                  />
                  <button type="submit" className="hidden">Submit</button>
                </div>
              </form>  
            ) : null}
          </div>
        ))}
      </div>

      <div></div>
    </div>
  );
};

export default Home;
