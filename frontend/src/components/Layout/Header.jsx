import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:4000/api/getAdminName",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error("Error fetching admin username:", error);
        setUsername("Guest");
      }
    };
    fetchAdminName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    toast.success("Logout Successful");
    navigate("/"); // Redirect to the login page
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="h-[70px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="https://www.adp.com/-/media/adp/redesign2018/ui/logo-adp-fy19.svg?rev=0769ecbf84a9412a93e2cd52b7319a13&hash=C2451A542096BF16BC40698417D5A6FD"
                alt="SHOPO Logo"
                className="h-[40px]"
              />
            </Link>
          </div>

          {/* Search Box */}
          <div className="flex-grow mx-4 relative">
            
          </div>

          {/* Admin Name */}
          <div className="flex-shrink-0 pr-4">
            <span className="text-lg font-semibold">{username}</span>
          </div>

          {/* Logout Button */}
          <div className={`${styles.button} flex-shrink-0`}>
            <button
              onClick={handleLogout}
              className="flex items-center text-[#fff]"
            >
              Logout <IoIosArrowForward className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
