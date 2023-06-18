import {
  faHome,
  faMagnifyingGlass,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, BottomNavigation } from "react-daisyui";
import { useLocation } from "react-router-dom";

const paths = [
  {
    path: "/",
    icon: faHome,
  },
  {
    path: "/search",
    icon: faMagnifyingGlass,
  },
  {
    path: "/onboard",
    icon: faPlusCircle,
  },
  {
    path: "/profile",
    avatar: "/zackbrcookin.jpg",
  },
];

function BottomNavigationComponent() {
  const { pathname } = useLocation();

  return (
    <BottomNavigation className="z-50 bg-base-300">
      {paths.map((data) => (
        <button
          onClick={() => (window.location.href = data.path)}
          className={pathname === data.path ? "active" : ""}
          disabled={data.avatar ? true : false}
        >
          {data.icon && <FontAwesomeIcon icon={data.icon} />}
          {data.avatar && (
            <Avatar
              src={data.avatar}
              size="xs"
              shape="circle"
              border
              borderColor="accent"
            />
          )}
        </button>
      ))}
    </BottomNavigation>
  );
}

export default BottomNavigationComponent;
