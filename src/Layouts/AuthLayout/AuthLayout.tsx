import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
export default function AuthLayout() {
  return (
    <section className="  bg-warning vh-100 overflow-hidden">
      <div className="row justify-content-center  align-items-center h-100 ">
        <div className="col-lg-4 col-md-6 bg-white p-5 rounded-4 ">
          <h4 className={`${styles.title} mb-3 ps-1 mt-1`}>
            Students Management System
          </h4>
          <Outlet />
        </div>
      </div>
    </section>
  );
}
