import { Button, CircularProgress, Stack } from "@mui/material";
import { useFetchUser } from "../hooks/useFetchUser";
import dayjs from "dayjs";

const UserDetails: React.FC<{ id: number | undefined }> = ({ id }) => {
  const { data: user, refetch, isLoading } = useFetchUser(id);

  if (isLoading) return <CircularProgress size={75} />;

  if (!isLoading && !user) return <span>User with id {id} not found</span>;

  return (
    <Stack gap={5}>
      <Stack direction={"row"} gap={10}>
        <label htmlFor="">Name</label>
        <span>{user?.name}</span>
      </Stack>
      <Stack direction={"row"} gap={10}>
        <label htmlFor="">Email</label>
        <span>{user?.email}</span>
      </Stack>
      <Stack direction={"row"} gap={10}>
        <label htmlFor="">Phone Number</label>
        <span>{user?.phoneNumber}</span>
      </Stack>
      <Stack direction={"row"} gap={10}>
        <label htmlFor="">Date of birth</label>
        <span>
          {dayjs(user?.dateOfBirth).format("dddd MMMM MM, YYYY HH:MM")}
        </span>
      </Stack>

      <Button onClick={() => refetch()}>Refetch user details</Button>
    </Stack>
  );
};

export default UserDetails;
