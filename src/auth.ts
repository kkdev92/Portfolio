const CORRECT_CODE = "1234";

function showAuthPrompt(): void {
    const html = `
      <style>
        #auth-wrapper {
          max-width: 360px;
          margin: 100px auto;
          padding: 24px 18px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          font-family: "Segoe UI", Roboto, sans-serif;
          text-align: center;
          background: #fff;
        }
  
        #auth-wrapper h2 {
          margin-bottom: 16px;
          font-size: 1.1rem;
          color: #444;
          font-weight: normal;
        }
  
        #passcode {
          padding: 8px;
          width: 80%;
          font-size: 0.95rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-bottom: 12px;
          box-sizing: border-box;
        }
  
        #auth-wrapper button {
          padding: 8px 18px;
          font-size: 0.95rem;
          background: #6200ee;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
  
        #auth-wrapper button:hover {
          background: #4b00c8;
        }
  
        #error-msg {
          color: #e53935;
          margin-top: 10px;
          font-size: 0.85rem;
        }
      </style>
  
      <div id="auth-wrapper">
        <h2>Welcome</h2>
        <input type="password" id="passcode" placeholder="Enter passcode">
        <br>
        <button onclick="checkCode()">ログイン</button>
        <p id="error-msg"></p>
      </div>
    `;

    document.body.innerHTML = html;
}

function checkCode(): void {
    const input = (document.getElementById("passcode") as HTMLInputElement).value;
    if (input === CORRECT_CODE) {
        localStorage.setItem("auth", "ok");
        location.reload();
    } else {
        const errorMsg = document.getElementById("error-msg");
        if (errorMsg) errorMsg.textContent = "パスコードが違います";
    }
}

function authCheck(): void {
    if (localStorage.getItem("auth") !== "ok") {
        showAuthPrompt();
    } else {
        injectLogoutButton();
    }
}

function injectLogoutButton(): void {
    const logoutBtn = document.createElement("button");
    logoutBtn.innerText = "ログアウト";
    logoutBtn.id = "logout-button";
    logoutBtn.onclick = () => {
        localStorage.removeItem("auth");
        location.reload();
    };

    if (!document.getElementById("logout-button-style")) {
        const style = document.createElement("style");
        style.id = "logout-button-style";
        style.textContent = `
        #logout-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 10px 16px;
          font-size: 0.9rem;
          background-color: #6200ee;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: background 0.3s ease;
        }
  
        #logout-button:hover {
          background-color: #4b00c8;
        }
      `;
        document.head.appendChild(style);
    }

    // すでに存在しなければ追加
    if (!document.getElementById("logout-button")) {
        document.body.appendChild(logoutBtn);
    }
}



window.addEventListener("DOMContentLoaded", authCheck);
