import { useState } from 'react';
import { supabase } from "../lib/supabaseClient";
import '../styles/LoginModal.css';

const Modal = ({ isOpen, onClose }) => {
    const [authType, setAuthType] = useState('Sign Up');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setErrorMsg("");
        setLoading(true);

        if (authType === "Sign Up") {
            if (password !== confirmPassword) {
                setErrorMsg("Passwords do not match!");
                setLoading(false);
                return;
            }

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) setErrorMsg(error.message);
            else onClose();

        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) setErrorMsg("Invalid email or password");
            else onClose();
        }

        setLoading(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <button className="modal-close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <h1 className="modal-title">{authType} an Account</h1>

                {/* Toggle */}
                <div className="auth-toggle">
                    <label
                        className={`auth-toggle-item ${authType === 'Sign Up' ? 'active' : ''}`}
                        onClick={() => setAuthType('Sign Up')}
                    >
                        Sign Up
                    </label>

                    <label
                        className={`auth-toggle-item ${authType === 'Log In' ? 'active' : ''}`}
                        onClick={() => setAuthType('Log In')}
                    >
                        Log In
                    </label>
                </div>

                {/* Inputs */}
                <div className="form-fields">
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input
                            className="input-field"
                            placeholder="you@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            className="input-field"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {authType === 'Sign Up' && (
                        <div className="input-group">
                            <label className="input-label">Confirm Password</label>
                            <input
                                className="input-field"
                                placeholder="••••••••"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {errorMsg && <p className="error-msg">{errorMsg}</p>}

                {/* Submit */}
                <div className="action-btn">
                    <button onClick={handleSubmit} className="submit-btn" disabled={loading}>
                        {loading ? "Please wait..." : authType}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
