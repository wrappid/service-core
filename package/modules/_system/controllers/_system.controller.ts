export const getVersion = async (req: any, res: any) => {
  try {
    /**
     * @todo
     * get version logic
     */
    res.status(200).json({ message: "Get Version API call Sucessfully" });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};