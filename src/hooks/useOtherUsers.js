import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";

const useOtherUsers = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Function to fetch other users' profiles
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`, {
                    withCredentials: true
                });
                // Dispatch other users' data to the redux store
                dispatch(getOtherUsers(res.data.otherUsers));
            } catch (error) {
                // Log error message if fetching other users fails
                console.error("Failed to fetch other users:", error);
                // Optionally, dispatch an error action or handle error state here
            }
        };

        // Call the fetchOtherUsers function
        fetchOtherUsers();
    }, [id, dispatch]); // Add id and dispatch to the dependency array to ensure proper re-fetching when id changes
};

export default useOtherUsers;
