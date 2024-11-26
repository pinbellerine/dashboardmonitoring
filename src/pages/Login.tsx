import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { IoEyeSharp, IoEyeOffSharp } from 'solid-icons/io';
import "../pages/Login.css";

const Login = () => {
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [showPassword, setShowPassword] = createSignal(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((user) => user.email === email());

        if (!user) {
            alert("Email yang Anda inputkan tidak ada");
            return;
        }

        if (user.password === password()) {
            alert("Login sukses");
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/dashboard");
        } else {
            alert("Password salah");
        }
    };

    return (
        <section class="login-section">
            <div class="login-container">
                <div class="login-card">
                    <img src="public/img/Logo.png" alt="Logo" class="logo" />
                    <h1>Masuk ke akun Anda</h1>
                    <p>Selamat datang kembali!</p>
                    <form onSubmit={handleSubmit}>
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            class={email() ? 'has-content' : ''}
                            placeholder="Masukkan email Anda"
                            value={email()}
                            onInput={(e) => setEmail(e.target.value)}
                        />
                        <label for="password">Password</label>
                        <div class="password-container">
                            <input
                                type={showPassword() ? "text" : "password"}
                                id="password"
                                class={password() ? 'has-content' : ''}
                                placeholder="Masukkan password Anda"
                                value={password()}
                                onInput={(e) => setPassword(e.target.value)}
                            />
                            <span class="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword() ? <IoEyeOffSharp size={20} /> : <IoEyeSharp size={20} />}
                            </span>
                        </div>
                        <a href="#" class="forgot-password">Lupa password?</a>
                        <button type="submit">Masuk</button>
                    </form>
                    <p class="register-page">Belum punya akun? <a href="/">Buat sekarang!</a></p>
                </div>
                <div class="login-illustration">
                    <img src="public/img/LoginAsset.gif" alt="Dashboard Illustration" />
                    <p>Masuk sekarang untuk mengakses dashboard dan memanfaatkan semua fitur kami yang dirancang untuk membantu Anda memahami data secara lebih efektif.</p>
                </div>
            </div>
        </section>
    );
};

export default Login;
