import { FaFolderPlus, FaFileMedical, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

const Home = () => {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isEditing , setIsEditing] = useState(false)
  const [toggle , setToggle] = useState(false)
  const [newName, setNewName] = useState("");
  const [data, setData] = useState({
    id: 1,
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

  const handleEdit = (node) => {
    if(node.id !== 1){
      setToggle(true)
      setIsEditing(true)
      setIsCreatingFile(false);
      setIsCreatingFolder(false);
      setNewName(node.name);
      setActiveFolder(node)
    }
 }
  
  const handleDelete = (id) => {
    const deleteItem = (node) => {
      if (node.children) {
        node.children = node.children.filter((child) => child.id !== id);
        node.children.forEach(deleteItem);
      }
    };
  
    const newData = { ...data };
    deleteItem(newData);
    setData(newData);
  };
  

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!newName) return;
      const rename = (node, newName) => {
        if (activeFolder.id === node.id ) {
          node.name = newName;
        } else if (node.children) {
          node.children.forEach(child => rename(child, newName));
        }
      };
      
      if(toggle){
       rename(data,newName)
       setData({ ...data });
       setNewName("");
       setIsCreatingFolder(false);
       setIsCreatingFile(false);
       setIsEditing(false)
       setToggle(false)
       console.log(toggle)
      } else {

        const newItem = {
          id: Date.now().toString(),
          name: newName,
          children: isCreatingFolder ? [] : undefined, 
        };
    
        const newData = {...data}
        
        activeFolder.children.push(newItem);
    
        setData(newData)
        setNewName("");
        setIsCreatingFolder(false);
        setIsCreatingFile(false);
      }
    };

  const renderTree = (node, level = 0) => {
    return (
      <div key={node.id} style={{ marginLeft: `${level * 16}px` }}> 
        <div className="flex border rounded-lg justify-between bg-[#222E3E] items-center w-[400px] p-3 mt-2">
          <div className="flex items-center gap-3 text-white" onClick={() => setActiveFolder(node)}>
            {node.children ? <FaFolderPlus /> : <FaFileMedical />}
            <h4>{node.name}</h4>
          </div>
          <div className="flex gap-2 text-[#A4ADBA] cursor-pointer">
            {node.children && (
              <>
                <FaFolderPlus onClick={() => handleCreateSubfolder(node)} />
                <FaFileMedical onClick={() => handleCreateSubfile(node)} />
              </>
            )}
            <FaEdit onClick={()=>handleEdit(node)}/>
            <AiFillDelete onClick={()=>handleDelete(node.id)}/>
          </div>
        </div>
    
        {activeFolder === node && (isCreatingFolder || isCreatingFile || isEditing) && (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 items-center w-[400px] p-3 ml-5 mt-2">
              <div className="flex items-center gap-1 text-lg">
                {isCreatingFolder ? <FaFolderPlus /> : (isCreatingFile ? <FaFileMedical /> : <FaEdit />)}
              </div>
              <input
                type="text"
                placeholder={isCreatingFolder ? "New folder name" : isCreatingFile ? "New file name" : "Edit name"}
                value={newName}
                onChange={handleInputChange}
                className="focus:outline-none border border-black rounded-lg bg-white px-2"
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
