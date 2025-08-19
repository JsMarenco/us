// Current project dependencies
import useAuth from "../../hooks/useAuth";

// Current project dependencies

export default function UserNavCard() {
  const { user, loading, error } = useAuth();

  if (loading || error || !user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <img
        src={user.avatarSrc}
        alt={`${user.firstName} ${user.lastName}`}
        className="h-8 w-8 cursor-pointer rounded-full object-cover"
      />

      <div className="hidden flex-col md:flex">
        <span className="text-sm font-semibold text-gray-800">
          {user.username}
        </span>
        <span className="text-xs text-gray-500">
          {user.firstName} {user.lastName}
        </span>
      </div>
    </div>
  );
}
