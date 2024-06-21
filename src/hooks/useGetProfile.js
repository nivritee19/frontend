import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to fetch the user profile
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        // Dispatch the user profile data to the redux store
        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        // Log error message if fetching profile fails
        console.error("Failed to fetch user profile:", error);
        // Optionally, dispatch an error action or handle error state here
      }
    };

    // Call the fetchMyProfile function
    fetchMyProfile();
  }, [id, dispatch]); // Add dispatch to the dependency array to avoid warnings
};

export default useGetProfile;
