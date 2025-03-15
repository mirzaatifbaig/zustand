import useUserStore from "@/store";

function Modal() {
    const { isModalOpen, closeModal } = useUserStore();

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg dark:bg-gray-800 text-black dark:text-white">
                <h2 className="text-2xl font-bold mb-4">🔥 Zustand Modal</h2>
                <p>This modal is globally controlled with Zustand!</p>
                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                    Close Modal
                </button>
            </div>
        </div>
    );
}

export default Modal;
