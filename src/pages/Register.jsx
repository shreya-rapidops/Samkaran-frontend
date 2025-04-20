import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const BOARDS = [
  "CBSE", "CISCE", "NIOS", "IB", "CAIE", "MSBSHSE", "TNBSE", "UPMSP", "KSEEB", "WBBSE",
  "RBSE", "GSEB", "BSEAP", "TBSE", "MPBSE", "BSEB", "BSE Odisha", "KBPE", "PSEB", "HBSE", "DBSE"
];

export default function Register() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
    city: "", state: "", board: "", studentId: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    generateStudentId();
  }, []);

  const generateStudentId = async () => {
    let { data, error } = await supabase
      .from("students")
      .select("studentId", { count: "exact" });

    const nextId = (data?.length || 0) + 1;
    const sid = "SID" + nextId.toString().padStart(4, "0");
    setForm((prev) => ({ ...prev, studentId: sid }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

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
      setMessage("✅ Registered successfully! Check your email to confirm.");
    } else {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🙋‍♂️ Student Registration</h1>
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
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="p-2 border rounded col-span-1" required />
        <input name="confirmPassword" type="password" placeholder="Re-enter Password" onChange={handleChange} className="p-2 border rounded col-span-1" required />
        <div className="col-span-2 text-sm text-gray-500">
          Your Student ID: <b>{form.studentId || "Generating..."}</b>
        </div>
        <button className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}