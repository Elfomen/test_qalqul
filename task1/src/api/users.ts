import axiosEvent from "../axios";

export const fetchUsers = async (id: number | undefined) => {
  const result = await axiosEvent.get<{
    email: string;
    name: string;
    phoneNumber: string;
    sex: string;
    dateOfBirth: Date;
  }>(`/task1/user/${id}`);

  return result.data ?? result;
};
