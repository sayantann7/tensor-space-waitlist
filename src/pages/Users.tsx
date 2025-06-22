import { Link } from "react-router-dom";

const mockUsers = [
  { id: "user1", name: "CodeNest", email: "alice@email.com" },
  { id: "user2", name: "DevDen", email: "bob@email.com" },
  { id: "user3", name: "StackSpace", email: "carol@email.com" },
  { id: "user4", name: "Tensor Space", email: "dave@email.com" },
  { id: "user5", name: "BitBase", email: "eve@email.com" },
];

const Users = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center bg-white overflow-hidden p-4 sm:p-6">
      {/* Side gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl font-coolvetica text-[#F24C00] mb-8 text-center mt-8">All Users</h1>
        <div className="flex flex-col gap-6 mb-16">
          {mockUsers.map(user => (
            <Link to={`/users/${user.id}`} key={user.id} className="bg-white/90 rounded-2xl shadow-md border border-[#F24C00]/20 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:scale-105 transition-transform duration-200">
              <div>
                <div className="font-coolvetica text-lg text-[#F24C00] mb-1">{user.name}</div>
                <div className="text-gray-500 text-xs mb-2">{user.email}</div>
                <div className="font-coolvetica text-base text-black">ID: {user.id}</div>
              </div>
              <span className="font-coolvetica text-[#F24C00] text-base">View Profile →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users; 