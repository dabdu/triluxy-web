import { useSelector } from "react-redux";
import { SideBar, Spinner } from "../components";
import { AdminSideBar } from "./admin";

function DashboardContainer({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "start",
        margin: 0,
      }}
      className=""
    >
      <SideBar />
      {/* {user.userRole === "Admin" ? <AdminSideBar /> : <SideBar />} */}
      <div
        style={{
          width: "85%",
          background: "white",
        }}
        className={""}
      >
        {/* <div style={{ height: "100%", width: 120 }}></div> */}
        {children}
      </div>
    </div>
  );
}

export default DashboardContainer;
