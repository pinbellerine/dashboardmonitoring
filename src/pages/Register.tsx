import { createSignal } from 'solid-js';
import { IoEyeSharp, IoEyeOffSharp } from 'solid-icons/io';
import { useNavigate } from '@solidjs/router';
import "./Register.css";

export default function Register() {
  const [name, setName] = createSignal('');
  const [birthdate, setBirthdate] = createSignal('');
  const [bloodType, setBloodType] = createSignal('');
  const [gender, setGender] = createSignal('');
  const [age, setAge] = createSignal('');
  const [job, setJob] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [showPassword, setShowPassword] = createSignal(false);
  const [termsAccepted, setTermsAccepted] = createSignal(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !name() ||
      !birthdate() ||
      !bloodType() ||
      !gender() ||
      !age() ||
      !job() ||
      !email() ||
      !password()
    ) {
      alert('Semua kolom harus diisi.');
      return;
    }

    if (!isValidEmail(email())) {
      alert('Format email tidak valid.');
      return;
    }

    // Validasi terms and conditions
    if (!termsAccepted()) {
      alert('Anda harus menyetujui syarat dan ketentuan.');
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === email());
    if (emailExists) {
      alert('Email sudah terdaftar. Silakan gunakan email lain.');
      return;
    }

    const userData = {
      name: name(),
      birthdate: birthdate(),
      bloodType: bloodType(),
      gender: gender(),
      age: age(),
      job: job(),
      email: email(),
      password: password()
    };

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Data telah disimpan ke localStorage!");

    // Clear the form
    setName('');
    setBirthdate('');
    setBloodType('');
    setGender('');
    setAge('');
    setJob('');
    setEmail('');
    setPassword('');
    setTermsAccepted(false);

    navigate('/login');
  };

  return (
    <section>
      <div class="register-container">
        <div class="register-card">
          <img src="public/img/Logo.png" alt="Logo" class="logo" />
          <h1>Buat akun Anda</h1>
          <p>Selamat datang! Silahkan masukkan informasi Anda</p>
          <form onSubmit={handleRegister}>
            <div class="form-row">
              <div class="form-group">
                <label for="name">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  value={name()}
                  onInput={(e) => setName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="birthdate">Tanggal Lahir</label>
                <input
                  type="date"
                  id="birthdate"
                  value={birthdate()}
                  onInput={(e) => setBirthdate(e.target.value)}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="bloodType">Golongan Darah</label>
                <select
                  id="bloodType"
                  value={bloodType()}
                  onInput={(e) => setBloodType(e.target.value)}
                >
                  <option value="">Pilih golongan darah</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
              <div class="form-group">
                <label for="gender">Jenis Kelamin</label>
                <select
                  id="gender"
                  value={gender()}
                  onInput={(e) => setGender(e.target.value)}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="age">Umur</label>
                <input
                  type="number"
                  id="age"
                  placeholder="Masukkan umur Anda"
                  value={age()}
                  onInput={(e) => setAge(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="job">Pekerjaan</label>
                <input
                  type="text"
                  id="job"
                  placeholder="Masukkan pekerjaan Anda"
                  value={job()}
                  onInput={(e) => setJob(e.target.value)}
                />
              </div>
            </div>
            <div class="form-full-row">
              <div class="form-full-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Masukkan email Anda"
                  value={email()}
                  onInput={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div class="form-full-row">
              <div class="form-full-group">
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
              </div>
            </div>
            <div class="terms">
              <div class="checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted()}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              </div>
              <label for="terms">
                Saya menyetujui <a href="#">Syarat dan Ketentuan</a>
              </label>
            </div>
            <button type="submit">
              Daftar
            </button>
            <p class="register-page">
              Sudah punya akun? <a href="/login">Masuk disini</a>
            </p>
          </form>
        </div>
        <div class="register-illustration">
          <img src="public/img/RegisterAsset.gif" alt="Illustration" />
          <p>D'board adalah solusi unggul yang memudahkan Anda dalam memantau dan mengelola data pengguna. Daftarkan akun Anda untuk mulai menjelajahi dashboard yang dirancang khusus untuk memenuhi kebutuhan Anda.</p>
        </div>
      </div>
    </section>
  );
}
