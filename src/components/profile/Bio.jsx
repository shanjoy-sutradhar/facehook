import { useState } from "react";
import { actions } from "../../actions";
import CheckIcon from "../../assets/icons/checkGreen.webp";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hoooks/useAxios";
import { useProfile } from "../../hoooks/useProfile";
function Bio() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleBioEdit = async (e) => {
    e.preventDefault();
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );
      // console.log(response);
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEditMode(false);
    } catch (err) {
      dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: err.message });
    }
  };
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6 ">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className="p-2 leading-[188%] text-gray-600 bg-amber-50 lg:text-lg rounded-md"
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {!editMode ? (
        <button
          className="flex-center h-7 w-7 rounded-full bg-gray-800"
          onClick={() => setEditMode(true)}
        >
          <img src={EditIcon} alt="Edit" />
        </button>
      ) : (
        <button
          type="button"
          className="flex-center h-7 w-7 rounded-full bg-green-700"
          onClick={(e) => handleBioEdit(e)}
        >
          <img src={CheckIcon} alt="Check" />
        </button>
      )}
    </div>
  );
}

export default Bio;
