🛡️ Sistem Keamanan Gudang Berbasis IoT

Sistem Keamanan Gudang Berbasis IoT merupakan sebuah sistem monitoring dan keamanan gudang yang memanfaatkan ESP32, sensor ultrasonik, Firebase Realtime Database, dan web dashboard untuk melakukan pemantauan kondisi gudang secara realtime.

Sistem dirancang untuk mendeteksi keberadaan objek atau pergerakan di area gudang berdasarkan jarak yang dibaca oleh sensor ultrasonik. Data dari ESP32 dikirimkan ke Firebase Realtime Database dan kemudian ditampilkan pada dashboard web secara realtime.

Selain monitoring kondisi sensor, sistem juga menyediakan informasi status perangkat ESP32, buzzer, lampu indikator, jarak objek, riwayat deteksi, serta log aktivitas sistem.

✨ Fitur

🔐 Authentication
a. Login menggunakan Firebase Authentication.
b. Sistem membedakan akses pengguna berdasarkan proses autentikasi.
c. Informasi akun pengguna ditampilkan pada dashboard.

📡 Monitoring ESP32
a. Menampilkan status koneksi ESP32.
b. Menampilkan waktu terakhir ESP32 mengirimkan data (Last Seen).
c. ESP32 dianggap online apabila masih mengirimkan heartbeat dalam interval yang ditentukan.

📏 Monitoring Sensor Ultrasonik
a. Membaca jarak objek secara realtime.
b. Menampilkan status sensor:
   - Terdeteksi
   - Tidak Terdeteksi
c. Menampilkan jarak objek dalam satuan centimeter (cm).

🚨 Sistem Keamanan
a. Mendeteksi perubahan kondisi sensor.
b. Mengaktifkan status keamanan ketika objek/pergerakan terdeteksi.
c. Monitoring status buzzer.
d. Monitoring status lampu indikator.
e. Menampilkan status gudang:
   - AMAN
   - BAHAYA

📊 Dashboard Realtime
a. Monitoring data secara realtime melalui Firebase.
b. Menampilkan grafik jarak objek terhadap waktu deteksi.
c. Menampilkan jumlah deteksi.
d. Menampilkan deteksi terakhir.
e. Menampilkan activity log sistem.

⚙️ System Control

Administrator dapat:

a. Mengaktifkan sistem keamanan.
b. Menonaktifkan sistem keamanan.
c. Melihat status sistem secara realtime.

Alur Sistem

1. Sensor ultrasonik membaca jarak objek.
2. ESP32 memproses data sensor.
3. ESP32 menentukan kondisi sensor dan sistem keamanan.
4. Data dikirimkan ke Firebase Realtime Database.
5. Firebase menyimpan dan menyediakan data secara realtime.
6. Web dashboard mengambil data dari Firebase.
7. Dashboard menampilkan status keamanan, jarak objek, status perangkat, grafik, dan activity log.
8. Administrator dapat mengubah status sistem melalui dashboard.

👥 Author

Project ini dikembangkan oleh:

1. Muhammad Saoki Ramada
- Backend / System Development
- Web Dashboard
- Firebase Integration
- System Integration

2. Abdullah Akhdan Zaid
- IoT / Hardware Development
- ESP32
- Sensor Integration

3. Muhammad Ihsan Anafi Putra
- IoT / Hardware Development
- Hardware Integration
- System Testing

📌 Project Information

a. Project: Sistem Keamanan Gudang Berbasis IoT
b. Platform: Web + IoT
c. Microcontroller: ESP32
d. Database: Firebase Realtime Database
e. Authentication: Firebase Authentication
f. Frontend: HTML, CSS, JavaScript
g. Backend: Node.js + Express.js
h. Visualization: Chart.js

📄 License

Project Sistem Keamanan Gudang Berbasis IoT ini dikembangkan sebagai bagian dari penilaian tugas akhir (UAS) pada mata kuliah Platform IoT.

Project ini bertujuan untuk menerapkan konsep Internet of Things (IoT) yang telah dipelajari selama perkuliahan ke dalam sebuah sistem yang dapat melakukan pemantauan kondisi keamanan gudang secara realtime.

Selain sebagai tugas akademik, project ini juga dikembangkan sebagai sarana pembelajaran, dokumentasi, dan portofolio pengembangan sistem IoT, khususnya dalam aspek integrasi hardware, backend, database realtime, dan web dashboard.
