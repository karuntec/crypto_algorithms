document.addEventListener("DOMContentLoaded", function() {
  const encryptionForm = document.getElementById("encryptionForm");

  function displaySubstitutionForm() {
    encryptionForm.innerHTML = `
            <h2>Substitution Cipher</h2>
            <label for="substitutionKey">Key:</label>
            <input type="text" id="substitutionKey" name="substitutionKey">
            <button onclick="generateSubstitutionKey()">Generate Key</button><br>
            <label for="substitutionText">Text:</label>
            <textarea id="substitutionText" name="substitutionText" rows="4" cols="50"></textarea><br>
            <button onclick="substitutionEncrypt()">Encrypt</button><br>
            <label for="substitutionEncryptedText">Encrypted Text:</label>
            <textarea id="substitutionEncryptedText" name="substitutionEncryptedText" rows="4" cols="50" readonly></textarea><br>
            <button onclick="substitutionDecrypt()">Decrypt</button><br>
            <label for="substitutionDecryptedText">Decrypted Text:</label>
            <textarea id="substitutionDecryptedText" name="substitutionDecryptedText" rows="4" cols="50"></textarea>
        `;
  }

  function displayPolyalphabeticForm() {
    encryptionForm.innerHTML = `
            <h2>Polyalphabetic Cipher</h2>
            <label for="polyalphabeticKey">Key:</label>
            <input type="text" id="polyalphabeticKey" name="polyalphabeticKey">
            <button onclick="generatePolyalphabeticKey()">Generate Key</button><br>
            <label for="polyalphabeticText">Text:</label>
            <textarea id="polyalphabeticText" name="polyalphabeticText" rows="4" cols="50"></textarea><br>
            <button onclick="polyalphabeticEncrypt()">Encrypt</button><br>
            <label for="polyalphabeticEncryptedText">Encrypted Text:</label>
            <textarea id="polyalphabeticEncryptedText" name="polyalphabeticEncryptedText" rows="4" cols="50" readonly></textarea><br>
            <button onclick="polyalphabeticDecrypt()">Decrypt</button><br>
            <label for="polyalphabeticDecryptedText">Decrypted Text:</label>
            <textarea id="polyalphabeticDecryptedText" name="polyalphabeticDecryptedText" rows="4" cols="50"></textarea>
        `;
  }

  function displayDESForm() {
    encryptionForm.innerHTML = `
            <h2>DES Algorithm</h2>
            <label for="desKey">Key:</label>
            <input type="text" id="desKey" name="desKey">
            <button onclick="generateDESKey()">Generate Key</button><br>
            <label for="desText">Input Text:</label>
            <textarea id="desText" name="desText" rows="4" cols="50"></textarea><br>
            <button onclick="desEncrypt()">Encrypt</button><br>
            <label for="encryptedText">Encrypted Text:</label>
            <textarea id="encryptedText" name="encryptedText" rows="4" cols="50" readonly></textarea><br>
            <button onclick="desDecrypt()">Decrypt</button><br>
            <label for="decryptedText">Decrypted Text:</label>
            <textarea id="decryptedText" name="decryptedText" rows="4" cols="50"></textarea>
        `;
  }

  function displaySHAForm() {
    encryptionForm.innerHTML = `
            <h2>SHA</h2>
            <label for="shaText">Text:</label>
            <input type="text" id="shaText" name="shaText"><br>
            <button onclick="shaEncrypt()">Encrypt</button><br>
            <label for="shaEncryptedText">Encrypted Text:</label>
            <input type="text" id="shaEncryptedText" name="shaEncryptedText" readonly>
        `;
  }

  function displayMD5Form() {
    encryptionForm.innerHTML = `
            <h2>MD5</h2>
            <label for="md5Text">Text:</label>
            <input type="text" id="md5Text" name="md5Text"><br>
            <button onclick="md5Encrypt()">Encrypt</button><br>
            <label for="md5EncryptedText">Encrypted Text:</label>
            <input type="text" id="md5EncryptedText" name="md5EncryptedText" readonly>
        `;
  }

  // Event listeners for algorithm selection
  document.getElementById("substitution").addEventListener("click", displaySubstitutionForm);
  document.getElementById("polyalphabetic").addEventListener("click", displayPolyalphabeticForm);
  document.getElementById("des").addEventListener("click", displayDESForm);
  document.getElementById("sha").addEventListener("click", displaySHAForm);
  document.getElementById("md5").addEventListener("click", displayMD5Form);
});

const resultDiv = document.getElementById("result");

function generateSubstitutionKey() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const key = alphabet
    .split("")
    .sort((a, b) => (Math.random() - 0.5))
    .join("");
  document.getElementById("substitutionKey").value = key;
}

function generatePolyalphabeticKey() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const size = Math.floor(Math.random() * 15);
  let key = '';
  for (let i = 0; i < size; i++) {
    let randomIndex = Math.floor(Math.random() * alphabet.length);
    key += alphabet[randomIndex];
  }
  document.getElementById("polyalphabeticKey").value = key;
}

function generateDESKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 8; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  document.getElementById("desKey").value = key;
}

function substitutionEncrypt() {
  const key = document.getElementById("substitutionKey").value.toLowerCase();
  const text = document.getElementById("substitutionText").value.toLowerCase();

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let substitutionTable = {};
  for (let i = 0; i < alphabet.length; i++) {
    substitutionTable[alphabet[i]] = key[i % key.length];
  }

  let encryptedText = "";
  for (let i = 0; i < text.length; i++) {
    if (alphabet.includes(text[i])) {
      encryptedText += substitutionTable[text[i]];
    } else {
      encryptedText += text[i];
    }
  }

  document.getElementById("substitutionEncryptedText").value = encryptedText;
}

function substitutionDecrypt() {
  const key = document.getElementById("substitutionKey").value.toLowerCase();
  const text = document.getElementById("substitutionEncryptedText").value.toLowerCase();

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let decryptionTable = {};
  for (let i = 0; i < alphabet.length; i++) {
    decryptionTable[key[i % key.length]] = alphabet[i];
  }

  let decryptedText = "";
  for (let i = 0; i < text.length; i++) {
    if (alphabet.includes(text[i])) {
      decryptedText += decryptionTable[text[i]];
    } else {
      decryptedText += text[i];
    }
  }

  document.getElementById("substitutionDecryptedText").value = decryptedText;
}

function polyalphabeticEncrypt() {
  const key = document.getElementById("polyalphabeticKey").value.toLowerCase();
  const text = document.getElementById("polyalphabeticText").value.toLowerCase();

  let encryptedText = "";
  for (let i = 0; i < text.length; i++) {
    let shift = key.charCodeAt(i % key.length) - 97;
    let charCode = text.charCodeAt(i);
    if (97 <= charCode && charCode <= 122) {
      encryptedText += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    } else {
      encryptedText += text[i];
    }
  }

  document.getElementById("polyalphabeticEncryptedText").value = encryptedText;
}

function polyalphabeticDecrypt() {
  const key = document.getElementById("polyalphabeticKey").value.toLowerCase();
  const text = document.getElementById("polyalphabeticEncryptedText").value.toLowerCase();

  let decryptedText = "";
  for (let i = 0; i < text.length; i++) {
    let shift = key.charCodeAt(i % key.length) - 97;
    let charCode = text.charCodeAt(i);
    if (97 <= charCode && charCode <= 122) {
      decryptedText += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
    } else {
      decryptedText += text[i];
    }
  }

  document.getElementById("polyalphabeticDecryptedText").value = decryptedText;
}

function desEncrypt() {
  const key = document.getElementById("desKey").value;
  const text = document.getElementById("desText").value;
  if (!text) {
    resultDiv.innerHTML = `<p>Please enter some text to encrypt</p>`;
    return;
  }
  const encrypted = CryptoJS.DES.encrypt(text, key);
  document.getElementById("encryptedText").value = encrypted.toString();
}

function desDecrypt() {
  const key = document.getElementById("desKey").value;
  const text = document.getElementById("encryptedText").value;
  if (!text) {
    resultDiv.innerHTML = `<p>Please enter some text to decrypt</p>`;
    return;
  }
  const decrypted = CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
  document.getElementById("decryptedText").value = decrypted;
}

function shaEncrypt() {
  const text = document.getElementById("shaText").value;
  const hash = CryptoJS.SHA256(text).toString();
  document.getElementById("shaEncryptedText").value = hash;
}

function md5Encrypt() {
  const text = document.getElementById("md5Text").value;
  const hash = CryptoJS.MD5(text).toString();
  document.getElementById("md5EncryptedText").value = hash;
}
