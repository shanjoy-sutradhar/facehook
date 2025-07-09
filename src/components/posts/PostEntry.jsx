// PostEntry.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import { useAuth } from "../../hoooks/useAuth";
import useAxios from "../../hoooks/useAxios";
import { usePost } from "../../hoooks/usePost";
import { useProfile } from "../../hoooks/useProfile";
import Field from "../common/Field";

const PostEntry = ({ post, onCreateEditShowHide }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { auth } = useAuth();

  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile, dispatch: profileDispatch } = useProfile();
  const user = profile?.user ?? auth?.user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm();

  // Effect to populate form when `post` prop changes (for editing)
  useEffect(() => {
    if (post) {
      setValue("content", post.content);
      // If you want to display the existing image, you'd handle it here
      // but usually, file inputs are "uncontrolled" after selection.
      // You'd typically show the existing image URL next to the input.
      // setSelectedImage(null); // Clear any previously selected new image
    } else {
      reset(); // Clear form when creating a new post
      setSelectedImage(null); // Clear selected image
    }
  }, [post, setValue, reset]);

  const handlePostSubmit = async (formData) => {
    const payload = new FormData();
    payload.append("content", formData.content); // Add text input

    if (selectedImage) {
      payload.append("image", selectedImage);
    } else if (post && post.image && !selectedImage) {
      // If editing and no new image is selected, but an old image existed,
      // you might need to send a flag or the existing image path to the backend
      // to indicate that the image should be kept. This depends on your API.
      // For simplicity, if `image` is optional for update, you might just omit it.
      // Or if your backend handles empty image field as 'no change', then no explicit action needed.
      // If backend requires `image` field to keep old, you might add:
      // payload.append("image", post.image); // Or a specific flag for existing image
    }

    dispatch({ type: actions.post.DATA_FETCHING }); // For global post state
    profileDispatch({ type: actions.profile.DATA_FETCHING }); // For profile post state
    try {
      let response;
      if (post) {
        // EDIT MODE: Send PATCH or PUT request
        response = await api.patch(
          // Use patch or put depending on your API
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`,
          payload
        );
      } else {
        // CREATE MODE: Send POST request
        response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
          payload
        );
      }

      if (response.status === 200) {
        if (post) {
          dispatch({ type: actions.post.DATA_EDITED, data: response.data }); // This will also clear postToEdit in reducer
          profileDispatch({
            type: actions.profile.POST_EDITED,
            data: response.data,
          });
        } else {
          dispatch({ type: actions.post.DATA_CREATED, data: response.data });
          profileDispatch({
            type: actions.profile.POST_CREATED,
            data: response.data,
          });
        }
      }
      //Close this UI
      onCreateEditShowHide();
      reset();
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
      setError("content", {
        type: "server",
        message: error.response?.data?.message || "Something went wrong!",
      });
    }
  };
  return (
    <div className="card relative text-amber-50">
      <div className="mb-3 flex items-center justify-between">
        <h6 className="text-center text-lg font-bold lg:text-xl w-full">
          {post ? "Edit Post" : "Create Post"}
        </h6>
        <button
          type="button"
          aria-label="Close"
          onClick={onCreateEditShowHide}
          className="absolute right-4 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-800 shadow hover:bg-red-500 hover:text-white active:scale-95"
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="image"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedImage(file);
              }
            }}
          />
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[150px] p-3 w-full bg-lighterDark focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>

        <div className="mx-auto mb-4 flex max-w-[90%] items-center justify-center lg:mb-6">
          {selectedImage ? (
            <div className="relative">
              <img
                className="max-w-full"
                src={URL.createObjectURL(selectedImage)}
                // src={Poster}
                alt="preview"
              />
              <button
                type="button"
                aria-label="Remove image"
                onClick={() => setSelectedImage(null)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-800 shadow-md transition-all hover:bg-red-500 hover:text-white active:scale-95"
              >
                &times;
              </button>
            </div>
          ) : (
            post?.image && ( // Display existing image if no new one selected
              <div className="relative">
                <img
                  className="max-w-full"
                  src={`${import.meta.env.VITE_SERVER_BASE_URL}/${post.image}`}
                  alt="post image"
                />
                {/* Optional: Add a button to explicitly remove the existing image */}
                {/* <button
                  type="button"
                  aria-label="Remove existing image"
                  onClick={() => { /* Logic to tell backend to remove image */
                /* }}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-800 shadow-md transition-all hover:bg-red-500 hover:text-white active:scale-95"
                >
                  &times;
                </button> */}
              </div>
            )
          )}
        </div>

        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            {post ? "Update Post" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
