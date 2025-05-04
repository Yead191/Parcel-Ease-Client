import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";
import useAuth from "./useAuth";

const useManageParcel = () => {
  // const { searchParam, setSearchParam } = useAuth();
  // console.log(searchParam);
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-parcel");
      return res.data;
    },
  });
  return [parcels, loading, refetch];
};

export default useManageParcel;
