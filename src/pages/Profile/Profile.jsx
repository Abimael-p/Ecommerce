import { useSelector } from "react-redux";
import imageUser from "../../assets/icon/users.jpg";
import "./Profile.css";

const Profile = () => {
  const user = useSelector((store) => store.auth);

  return (
    <div className="container__user">
      <img src={imageUser} alt="" />
      <p>{user.fullName}</p>
    </div>
  );
};

export default Profile;
