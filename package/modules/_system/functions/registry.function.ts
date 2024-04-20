import fs from "fs";
import path from "path";

/**
 * This function searches for a folder named "registry" inside the "src" directory of a project.
 *
 * @param {string} projectRoot - The absolute or relative path to the root directory of the project.
 * @returns {string|null} - The absolute path to the "registry" folder if found, or null if not found.
 */
function findRegistryFolder(projectRoot:any): string | null {
  try {
      
    const srcPath = path.join(projectRoot, "src");  // Construct the 'src' directory path
    // Check if 'src' exists
    if (!fs.existsSync(srcPath)) {
      return null;
    }
    // Read all entries in 'src'
    const entries = fs.readdirSync(srcPath);
  
    // Search for the 'registry' folder
    for (const entry of entries) {
      const entryPath = path.join(srcPath, entry);
      if (fs.statSync(entryPath).isDirectory() && entry === "registry") {
        return entryPath;  // Found the registry folder
      }
    }
    return null;  // 'registry' folder not found
  } catch (error) {
    console.log(error);
    throw error;
  }
  
}
  
/**
   * This function lists the names of all files within a specified directory.
   *
   * @param {string} directoryPath - The absolute or relative path to the directory.
   * @returns {files} - It returns avalible files name .
   */
function listFilenames(directoryPath:string): string[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
      console.error("Directory does not exist:", directoryPath);
      return;
    }
    // Read directory contents
    const files = fs.readdirSync(directoryPath);
    console.log("Files in", directoryPath, ":");
    return files;
  }catch (error) {
    console.log(error);
    throw error;
  }
}
  
/**
   * 
   * @param req 
   * @returns 
   */
export const getRegistryFunc =  async (req:any) => {
  try {
    const currentDirectory = process.cwd();  // Get current working directory
    console.log("currentDirectory::",currentDirectory);
      
    const projectRoot = process.cwd();  // Get current working directory
    const registryPath = findRegistryFolder(projectRoot);
  
    if (registryPath) {
      console.log("::--------Start------::");
      console.log("Registry folder found:", registryPath);
      const fileList = listFilenames(registryPath);
      const name = req.params.name + ".ts";
  
      const hasControllersRegistry = fileList.some(file => file === name);
      if(hasControllersRegistry){
        const module = await import(`${registryPath}/${req.params.name}`);
        console.log("Data:: ",module.default);
        const totalRecords = Object.keys(module.default.default).length;
        const data = module.default.default ? module.default.default : module.default;
        const options = data
          ? Object.keys(data)?.map((com) => {
            return { id: com, label: com };
          })
          : [];
        return {status:200, data: options, totalRecords: totalRecords,  message: `${name} fetched successfully`};    
      }else{
        throw new Error ("Registry file not found in 'registry' directory.");
      }
    } else {
      throw new Error("Registry folder not found in 'src' directory.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
  
function getRegistryObjects(fileList:any) {
  const registryObjects:any = {};
  for (const filename of fileList) {
    if (filename.endsWith("Registry.ts")) {
      const name = filename.slice(0, -13);  // Remove '.ts' and 'Registry'
      registryObjects[name] = {};  // Create an empty object for the registry
    }
  }
  return registryObjects;
}

export const getRegistryListFunc = async () => {
  try {
    const currentDirectory = process.cwd();  // Get current working directory
    console.log("currentDirectory::",currentDirectory);
      
    const projectRoot = process.cwd();  // Get current working directory
    const registryPath = findRegistryFolder(projectRoot);
  
    if (registryPath) {
      console.log("::--------Start------::");
      console.log("Registry folder found:", registryPath);
      const fileList = listFilenames(registryPath);
      const registryMap = getRegistryObjects(fileList);

      console.log(registryMap);

        
    }
    return {status: 200, message: "API Call Success"};
  } catch (error) {
    console.log(error);
    throw error;
  }
};