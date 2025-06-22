import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NameForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 2 || name.length > 32) {
      setError("Name must be between 2 and 32 characters.");
      return;
    }
    setError("");
    localStorage.setItem("userName", name);
    navigate("/email");
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Side gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-white/90 rounded-3xl shadow-2xl border border-[#F24C00]/20 flex flex-col items-center">
        <motion.h1
          className="text-3xl md:text-4xl font-coolvetica text-[#F24C00] mb-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          What would name the coziest workstation on the planet?
        </motion.h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Think creatively... your fate depends on this"
            className="w-full px-5 py-4 rounded-xl text-black border border-[#F24C00]/30 bg-white/80 text-lg font-coolvetica focus:outline-none focus:ring-2 focus:ring-[#F24C00]/40 transition"
            required
          />
          {error && <div className="text-red-500 text-sm font-mono text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-b from-[#fba41b] to-[#fff3e0] text-black font-coolvetica text-lg shadow-md border border-[#fba41b]/60 hover:scale-105 transition-transform duration-200 mt-2"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameForm;
