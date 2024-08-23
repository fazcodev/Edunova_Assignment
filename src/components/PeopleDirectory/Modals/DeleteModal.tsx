import { Modal } from "@mui/material";
import { User, deleteUser } from "../users_data";
import { closeBlack_icon } from "../../../assets/assets";
import { useQueryClient } from "@tanstack/react-query";

function DeleteModal({
  open,
  handleClose,
  user,
}: {
  open: boolean;
  handleClose: () => void;
  user: User | null;
}) {
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    if (user) {
      deleteUser(user);
      await queryClient.invalidateQueries({
        queryKey: ["data"],
        refetchType: "all",
      });
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-lg p-6 w-[600px] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 items-end flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <h2
            id="modal-title"
            className="text-xl font-semibold flex-1 text-gray-800"
          >
            Delete Member Details
          </h2>
          <button>
            <img
              src={closeBlack_icon}
              alt="close"
              className="w-4 h-4 inline-block"
              onClick={handleClose}
            />
          </button>
        </div>
        <p
          id="modal-description"
          className="text-base w-full font-normal py-3 self-start text-neutral-700"
        >
          Are you sure you want to delete this Member's details? This action
          cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-dark_violet text-white text-base font-bold rounded py-2 px-3 hover:bg-violet-700"
          >
            DELETE
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
