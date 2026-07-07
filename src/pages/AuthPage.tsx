import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Eye, EyeOff, Smile, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthPage: React.FC = () => {
  const { login } = useStore();
  const navigate = useNavigate();

  // Mode States
  const [mode, setMode] = useState<'login' | 'signup' | 'otp' | 'faceid'>('login');
  
  // Input fields
  const [email, setEmail] = useState('valerie@diorlabs.com');
  const [password, setPassword] = useState('DiorLove123!');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: 'Weak', color: 'var(--danger)' });

  // Calculate Password Strength live
  useEffect(() => {
    let score = 0;
    if (password.length > 7) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let label = 'Weak';
    let color = 'var(--danger)';
    if (score === 2) { label = 'Medium'; color = 'var(--warning)'; }
    else if (score >= 3) { label = 'Strong'; color = 'var(--success)'; }

    setPasswordStrength({ score, label, color });
  }, [password]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate moving to OTP stage
    setMode('otp');
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate moving to FaceID scan stage
    setMode('faceid');
  };

  // Bio scanner loader logic
  useEffect(() => {
    if (mode === 'faceid') {
      const timer = setTimeout(() => {
        login(email);
        navigate('/profile');
      }, 2500); // 2.5s scan animation
      return () => clearTimeout(timer);
    }
  }, [mode, email, login, navigate]);

  const handleOtpChange = (val: string, index: number) => {
    if (isNaN(Number(val))) return;
    const nextOtp = [...otpCode];
    nextOtp[index] = val;
    setOtpCode(nextOtp);

    // Auto-focus next field
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div style={{ paddingTop: '140px', paddingBottom: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="luxury-container" style={{ width: '100%', maxWidth: '440px' }}>
        <div className="glass-card" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
          
          {/* Noise overlay */}
          <div className="noise-overlay" />

          {/* Mode Switch header */}
          {mode !== 'otp' && mode !== 'faceid' && (
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', paddingBottom: '15px', marginBottom: '30px' }}>
              <button
                onClick={() => setMode('login')}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontWeight: mode === 'login' ? 600 : 400,
                  color: mode === 'login' ? 'var(--text)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                Sign In
                {mode === 'login' && <motion.div layoutId="authTabLine" style={{ position: 'absolute', bottom: '-16px', left: 0, right: 0, height: '2px', background: 'var(--accent-dark)' }} />}
              </button>
              <button
                onClick={() => setMode('signup')}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontWeight: mode === 'signup' ? 600 : 400,
                  color: mode === 'signup' ? 'var(--text)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                Register
                {mode === 'signup' && <motion.div layoutId="authTabLine" style={{ position: 'absolute', bottom: '-16px', left: 0, right: 0, height: '2px', background: 'var(--accent-dark)' }} />}
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {mode === 'login' && (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleLoginSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Email Address</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-luxury" style={{ marginTop: '5px' }} />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Password</label>
                    <a href="#" style={{ fontSize: '11px', color: 'var(--accent-dark)', textDecoration: 'underline' }}>Forgot?</a>
                  </div>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                    <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="input-luxury" style={{ paddingRight: '45px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-luxury" style={{ width: '100%', marginTop: '10px' }}>
                  Continue
                </button>
              </motion.form>
            )}

            {mode === 'signup' && (
              <motion.form
                key="signup-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={() => setMode('otp')}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Email Address</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-luxury" style={{ marginTop: '5px' }} />
                </div>

                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Password</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                    <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="input-luxury" style={{ paddingRight: '45px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                        <span>Password Strength:</span>
                        <strong style={{ color: passwordStrength.color }}>{passwordStrength.label}</strong>
                      </div>
                      <div style={{ background: '#E2E8F0', height: '4px', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                        <div style={{ background: passwordStrength.color, width: `${(passwordStrength.score / 4) * 100}%`, height: '100%', transition: 'width 0.3s' }} />
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn-luxury" style={{ width: '100%', marginTop: '10px' }}>
                  Register Account
                </button>
              </motion.form>
            )}

            {mode === 'otp' && (
              <motion.form
                key="otp-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleOTPSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center' }}
              >
                <div>
                  <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0 }}>Security Verification</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', margin: 0 }}>We sent a 6-digit code to {email}</p>
                </div>

                {/* 6-Digit input boxes */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  {otpCode.map((val, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      style={{
                        width: '45px',
                        height: '50px',
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.7)',
                        outline: 'none',
                      }}
                    />
                  ))}
                </div>

                <button type="submit" className="btn-luxury" style={{ gap: '8px' }}>
                  <KeyRound size={16} />
                  <span>Verify Passcode</span>
                </button>
              </motion.form>
            )}

            {mode === 'faceid' && (
              <motion.div
                key="faceid-scan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center', padding: '20px 0' }}
              >
                {/* FaceID visual scanning box */}
                <div style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid var(--accent)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', overflow: 'hidden' }}>
                  <Smile size={48} color="var(--accent-dark)" />
                  {/* Laser bar animation */}
                  <motion.div
                    animate={{ y: [0, 80, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent-dark)',
                      boxShadow: '0 0 10px var(--accent-dark)',
                    }}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', margin: 0 }}>Authenticating Biometrics</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>FaceID style biometric verification sync...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
