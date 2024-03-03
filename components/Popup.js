function Popup({item, yesOnClick, noOnClick}) {
    return (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-transparent backdrop-blur-[2px] backdrop-brightness-75 overflow-hidden">
            <div className="p-10 bg-white rounded-lg flex flex-col items-center gap-6">
                <span>Are you sure that you want to delete the '{item}'?</span>
                <div className="text-white">
                    <button onClick={yesOnClick} className="mr-5 bg-red-500 px-4 py-2 rounded transition hover:bg-red-600">Yes, delete!</button>
                    <button onClick={noOnClick} className="bg-gray-400 px-4 py-2 rounded transition hover:bg-gray-500">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;