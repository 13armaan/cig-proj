import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !username) {
            alert("All fields required");
            return;
        }

        try {
            setLoading(true);

            await api.post("/accounts/register/", {
                username,
                email,
                password,
            });

            // store email for OTP step
            localStorage.setItem("signup_email", email);
            localStorage.setItem("pass",password);

            navigate("/verify-otp");
        } catch (err) {
            const data = err.response?.data;

            const message = data
                ? Object.values(data).flat()[0]
                : "Signup failed";

            alert(message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSignup} disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
            </button>
        </div>
    );
}