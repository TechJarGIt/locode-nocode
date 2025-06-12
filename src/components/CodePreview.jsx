const CodePreview = () => {
  return (
    <div className=" w-[30%] p-4 border-l border-gray-100 shadow-sm ">
        <div className="border-b border-gray-200 h-[60vh] mb-2">
            <h1 className="text-2xl mb-4 bg-gray-50 p-1 rounded-xl">Source Code</h1>
            <div>
                Code
            </div>
        </div>
        <div className="h-[25vh]">
            <h1 className="text-2xl mb-4 bg-gray-50 p-1 rounded-xl">Customise with ai</h1>
            <input type="text" placeholder="Enter your prompt"></input>
        </div>
    </div>
  )
}
export default CodePreview;