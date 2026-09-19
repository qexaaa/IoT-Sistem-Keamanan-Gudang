let previousSensor = null;

let securityData = null;
let systemEnabled = true;

/* ================
   SECURITY STATUS
=================== */

const securityRef = db.ref("security");

securityRef.on("value", (snapshot) => {

    securityData = snapshot.val();

    if (!securityData) return;

    // Cek perubahan status sensor
    if (
        previousSensor !== null &&
        previousSensor !== securityData.sensor
    ) {

        // Sensor mendeteksi gerakan
        if (securityData.sensor === "Terdeteksi") {

            addActivityLog(
                "Pergerakan terdeteksi",
                "danger"
            );

            db.ref("history").push({

                motion: "Terdeteksi",
                distance: securityData.distance,
                time: new Date().toLocaleTimeString("id-ID")

            });

        }

        // Sensor kembali normal
        if (securityData.sensor === "Tidak Terdeteksi") {

            addActivityLog(
                "Gudang kembali aman",
                "safe"
            );

        }

    }

    previousSensor = securityData.sensor;

    updateSecurityStatus();

});

/* =================
   UPDATE DASHBOARD
==================== */

function updateSecurityStatus() {

    if (!securityData) return;

    // Sistem dinonaktifkan
    if (!systemEnabled) {

        document.getElementById("statusText").innerHTML =
            "⚫ SISTEM DINONAKTIFKAN";

        document.getElementById("statusDescription").innerHTML =
            "Monitoring dihentikan oleh Admin";

        document.getElementById("securityStatus").style.background =
            "#6b7280";

        document.getElementById("sensorStatus").innerText =
            "Dinonaktifkan";

        document.getElementById("buzzerStatus").innerText =
            "Dinonaktifkan";

        document.getElementById("lampStatus").innerText =
            "Dinonaktifkan";

        document.getElementById("lastDetection").innerText = "-";

        return;

    }

    document.getElementById("sensorStatus").innerText =
    securityData.sensor || "-";

    document.getElementById("distanceStatus").innerText =
        `${securityData.distance ?? "-"} cm`;

    document.getElementById("buzzerStatus").innerText =
        securityData.buzzer || "-";

    document.getElementById("lampStatus").innerText =
        securityData.lamp || "-";

    document.getElementById("lastDetection").innerText =
        securityData.lastDetection || "-";

    document.getElementById("statusText").innerText =
        securityData.status || "AMAN";

    document.getElementById("statusDescription").innerText = "";

    const card =
        document.getElementById("securityStatus");

    card.style.background =
        securityData.status === "BAHAYA"
            ? "#dc2626"
            : "#16a34a";

}

/* ================
   HISTORY & CHART
=================== */

const historyRef = db.ref("history").limitToLast(20);

historyRef.on("value", (snapshot) => {

    const history = [];

    let totalToday = 0;

    // Ambil semua data dari Firebase
    snapshot.forEach((child) => {

        history.push(child.val());

    });

    // Urutkan berdasarkan waktu (paling lama -> paling baru)
    history.sort((a, b) => a.time.localeCompare(b.time));

    const labels = [];
    const values = [];

    history.forEach((item) => {

        labels.push(item.time);

        values.push(Number(item.distance) || 0);

        if (item.motion === "Terdeteksi") {
            totalToday++;
        }

    });

    motionChart.data.labels = labels;
    motionChart.data.datasets[0].data = values;

    motionChart.update();

    document.getElementById("totalMotionToday").innerText =
        `${totalToday} Deteksi`;

});

/* =================
   USER INFORMATION
==================== */

document.getElementById("userEmail").innerText =
    localStorage.getItem("email");

document.getElementById("loginTime").innerText =
    new Date().toLocaleString("id-ID");

/* =============
   ESP32 STATUS
================ */

const deviceRef = db.ref("device");

deviceRef.on("value", (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    const now =
        Math.floor(Date.now() / 1000);

    const diff =
        now - data.lastSeen;

    const lastSeen =
        new Date(
            data.lastSeen * 1000
        ).toLocaleTimeString("id-ID");

    const statusBox =
        document.getElementById("espStatus");

    if (diff < 300) {

        statusBox.innerHTML = `

            <p>🟢 ESP32 Online</p>

            <small>
                Last Seen:
                ${lastSeen}
            </small>

        `;

    } else {

        statusBox.innerHTML = `

            <p>🔴 ESP32 Offline</p>

            <small>
                Last Seen:
                ${lastSeen}
            </small>

        `;

    }

});

/* =============
   SYSTEM MODE
================ */

const systemRef = db.ref("system");

systemRef.on("value", (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    systemEnabled = data.enabled;

    updateSecurityStatus();

    const status =
        document.getElementById("systemStatus");

    const btn =
        document.getElementById("toggleSystemBtn");

    if (systemEnabled) {

        status.innerHTML =
            "🟢 SISTEM AKTIF";

        btn.innerText =
            "Nonaktifkan Sistem";

        btn.style.background =
            "#dc2626";

    } else {

        status.innerHTML =
            "⚫ SISTEM NONAKTIF";

        btn.innerText =
            "Aktifkan Sistem";

        btn.style.background =
            "#16a34a";

    }

});

/* ===============
   ACTIVITY LOG
================== */

function addActivityLog(action, type) {

    db.ref("activityLogs").push({

        action,
        type,
        time: new Date().toLocaleTimeString("id-ID")

    });

}

function toggleSystem() {

    const enabled = !systemEnabled;

    systemRef.update({

        enabled

    });

    addActivityLog(

        enabled
            ? "Sistem diaktifkan oleh Admin"
            : "Sistem dinonaktifkan oleh Admin",

        "system"

    );

}

/* ===================
   LOAD ACTIVITY LOG
====================== */

const activityRef =
    db.ref("activityLogs");

activityRef
    .limitToLast(10)
    .on("value", (snapshot) => {

        const box =
            document.getElementById("activityLogs");

        box.innerHTML = "";

        const logs = [];

        snapshot.forEach((child) => {

            logs.unshift(child.val());

        });

        logs.forEach((log) => {

            let icon = "bi-file-earmark-text";

            switch (log.type) {

                case "system":
                    icon = "bi-gear-fill";
                    break;

                case "danger":
                    icon = "bi-exclamation-triangle-fill";
                    break;

                case "safe":
                    icon = "bi-check-circle-fill";
                    break;

                case "device":
                    icon = "bi-cpu-fill";
                    break;

            }

            box.innerHTML += `

                <div class="log-item">

                    <div class="log-icon">
                        <i class="bi ${icon}"></i>
                    </div>

                    <div class="log-content">

                        <strong>${log.time}</strong>

                        <p>${log.action}</p>

                    </div>

                </div>

            `;

        });

    });