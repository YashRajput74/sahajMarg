import { useState } from 'react';
import '../styles/LoginModal.css';

const Modal = ({ isOpen, onClose }) => {
    const [authType, setAuthType] = useState('Sign Up');

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <button className="modal-close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <h1 className="modal-title">{authType} an Account</h1>

                <div className="auth-toggle">
                    <label
                        className={`auth-toggle-item ${authType === 'Sign Up' ? 'active' : ''}`}
                        onClick={() => setAuthType('Sign Up')}
                    >
                        Sign Up
                        <input type="radio" checked={authType === 'Sign Up'} className="auth-radio" />
                    </label>
                    <label
                        className={`auth-toggle-item ${authType === 'Log In' ? 'active' : ''}`}
                        onClick={() => setAuthType('Log In')}
                    >
                        Log In
                        <input type="radio" checked={authType === 'Log In'} className="auth-radio" />
                    </label>
                </div>

                <div className="form-fields">
                    <div className="input-group">
                        <label htmlFor="email" className="input-label">Email Address</label>
                        <input className="input-field" id="email" placeholder="you@example.com" type="email" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input className="input-field" id="password" placeholder="••••••••" type="password" />
                    </div>

                    {authType === 'Sign Up' && (
                        <div className="input-group">
                            <label htmlFor="confirm-password" className="input-label">Confirm Password</label>
                            <input className="input-field" id="confirm-password" placeholder="••••••••" type="password" />
                        </div>
                    )}
                </div>

                <div className="action-btn">
                    <button className="submit-btn">
                        {authType}
                    </button>
                </div>

                <p className="terms-privacy">
                    By signing up, you agree to our
                    <a href="#" className="link">Terms of Service</a> and
                    <a href="#" className="link">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default Modal;
