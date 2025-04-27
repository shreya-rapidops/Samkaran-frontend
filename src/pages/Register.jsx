import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const BOARDS = [
  "CBSE", "ICSE", "NIOS", "IB", "CAIE", "MSBSHSE", "TNBSE", "UPMSP", "KSEEB", "WBBSE",
  "RBSE", "GSEB", "BSEAP", "TBSE", "MPBSE", "BSEB", "BSE Odisha", "KBPE", "PSEB", "HBSE", "DBSE"
];

export default function Register() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
    city: "", state: "", board: "", studentId: ""
  });
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateStudentId();
  }, []);

  // ➡️ Generate next Student ID
  const generateStudentId = async () => {
    const { data, error } = await supabase.from("students").select("id", { count: "exact" });

    if (!error) {
      const nextId = (data?.length || 0) + 1;
      const sid = "SID" + nextId.toString().padStart(4, "0");
      setForm((prev) => ({ ...prev, studentId: sid }));
    } else {
      console.error("Error generating student ID", error);
    }
  };

  // ➡️ Form handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    if (form.password !== form.confirmPassword) {
      toast.success("✅ Registered successfully!");
      toast.error("❌ Passwords don't match!");
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          city: form.city,
          state: form.state,
          board: form.board,
          studentId: form.studentId,
        },
      },
    });

    if (!error) {
      await supabase.from("students").insert([
        {
          studentId: form.studentId,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          city: form.city,
          state: form.state,
          board: form.board,
        },
      ]);
  
      toast.success("✅ Registered successfully! Check your email.");
      setTimeout(() => {
        navigate("/verify-success");
      }, 2000);
    } else {
      toast.error(`❌ ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🙋‍♂️ Student Registration</h1>

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} className="p-2 border rounded" required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} className="p-2 border rounded" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded col-span-2" required />
        <input name="city" placeholder="City" onChange={handleChange} className="p-2 border rounded" />
        <input name="state" placeholder="State" onChange={handleChange} className="p-2 border rounded" />
        <select name="board" onChange={handleChange} className="p-2 border rounded col-span-2" required>
          <option value="">Select Educational Board</option>
          {BOARDS.map((board) => (
            <option key={board} value={board}>{board}</option>
          ))}
        </select>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="p-2 border rounded" required />
        <input name="confirmPassword" type="password" placeholder="Re-enter Password" onChange={handleChange} className="p-2 border rounded" required />
        <div className="col-span-2 text-sm text-gray-600">
          Your Student ID: <b>{form.studentId || "Generating..."}</b>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "🔄 Registering..." : "Register"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}
