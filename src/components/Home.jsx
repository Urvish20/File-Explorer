import { FaFolderPlus, FaFileMedical, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

const Home = () => {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newName, setNewName] = useState("");
  const [data, setData] = useState({
    id: "1",
    name: "root",
    children: [],
  });
  const [activeFolder, setActiveFolder] = useState(null);

  const handleCreateSubfolder = (folder) => {
    setIsCreatingFolder(true);
    setIsCreatingFile(false);
    setActiveFolder(folder);
  };

  const handleCreateSubfile = (folder) => {
    setIsCreatingFile(true);
    setIsCreatingFolder(false);
    setActiveFolder(folder);
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName) return;

    const newItem = {
      id: Date.now().toString(),
      name: newName,
      children: isCreatingFolder ? [] : undefined, 
    };

    const newData = { ...data };

    activeFolder.children.push(newItem);

    setData(newData);
    setNewName("");
    setIsCreatingFolder(false);
    setIsCreatingFile(false);
  };

  const renderTree = (node, level = 0) => {
    return (
      <div key={node.id} style={{ marginLeft: level * 20 + 'px' }}>
        <div className="flex border rounded-lg justify-between bg-[#222E3E] items-center w-[400px] p-3 mt-2">
          <div className="flex items-center gap-3 text-white cursor-pointer" onClick={() => setActiveFolder(node)}>
            {node.children ? <FaFolderPlus /> : <FaFileMedical />}
            <h4>{node.name}</h4>
          </div>
          <div className="flex gap-2 text-[#A4ADBA]">
            {node.children && (
              <>
                <FaFolderPlus onClick={() => handleCreateSubfolder(node)} />
                <FaFileMedical onClick={() => handleCreateSubfile(node)} />
              </>
            )}
            <FaEdit />
            <AiFillDelete />
          </div>
        </div>

        {activeFolder === node && (isCreatingFolder || isCreatingFile) && (
          <form onSubmit={handleSubmit} className="ml-5">
            <div className="flex gap-2 items-center w-[400px] p-3 mt-2">
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
            </div>
          </form>
        )}

        {node.children && node.children.map((child) => renderTree(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="ml-[100px] mt-9">
      <h1 className="flex item-center justify-center text-3xl">Explore this file explorer</h1>
      <div>{renderTree(data)}</div>
    </div>
  );
};

export default Home;
