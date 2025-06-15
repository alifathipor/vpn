
//* Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()


let urlParams;
let userCode;

document.addEventListener("DOMContentLoaded", function () {
  // گرفتن URL فعلی
  urlParams = new URLSearchParams(window.location.pathname.split('/')[1]);
  userCode = urlParams.toString().slice(0, -1);

  if (userCode) {
    sendRequest();
  }
  // حذف userCode از URL و رفرش صفحه
  const newUrl = window.location.origin + window.location.pathname.replace(`/${userCode}`, '');
  history.replaceState(null, '', newUrl);
  //location.reload();
  copyConfigBtn.style.display = 'none';
  learnBtnMenu1.style.display = 'none';
  learnBtnMenu2.style.display = 'none';
  learnBtnMenu3.style.display = 'none';
  learnBtnMenu4.style.display = 'none';
});




var navLinks = document.getElementsByClassName('nav-link');
Array.from(navLinks).forEach(function (element) {
  element.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default action of link

    var tabId = this.getAttribute('href'); // Get href value of clicked link
    document.getElementById(tabId.slice(1)).classList.add('show', 'active');
    // Show and activate corresponding tab
    var tabPanes = document.getElementsByClassName('tab-pane');
    Array.from(tabPanes).forEach(function (tab) {
      if (tab.id !== tabId.slice(1)) { // Hide other tabs
        tab.classList.remove('show', 'active');
      }
    });
    Array.from(navLinks).forEach(function (link) {
      if (link.getAttribute('href') === tabId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
});
function showTab(tabId) {
  // فعال کردن تب مشخص شده با استفاده از دکمه
  var tabLink = document.querySelector('.nav-link[href="#' + tabId + '"]');
  if (tabLink) {
    tabLink.click(); // شبیه‌سازی کلیک بر روی لینک مربوطه
  }
}





const learnBtnMenu1 = document.getElementById('learnBtnMenu1');
const learnBtnMenu2 = document.getElementById('learnBtnMenu2');
const learnBtnMenu3 = document.getElementById('learnBtnMenu3');
const learnBtnMenu4 = document.getElementById('learnBtnMenu4');
const copyConfigBtn = document.getElementById('copyConfigBtn');
let uuid = '';
let decodedString;
let inputText;
let valueBody;

async function sendRequest() {
  if (userCode) {
    inputText = userCode;
    document.getElementById('inputText').value = inputText;

  } else {
    inputText = document.getElementById('inputText').value;
  }
  const warningMessage = document.getElementById('warningMessage');
  if (inputText.length < 5) {

    warningMessage.textContent = "It should not be less than 5 digits";
    document.getElementById('inputText').classList.add('is-invalid');
  } else {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resultDiv = document.getElementById('result');
    document.getElementById('result').innerText = `کد کاربر یافت شد ${userCode}`;
    const sendButton = document.querySelector('.btn-primary');
    const additionalInfoDiv = document.getElementById('additionalInfo');
    learnBtnMenu1.style.display = 'none';
    learnBtnMenu2.style.display = 'none';
    learnBtnMenu3.style.display = 'none';
    learnBtnMenu4.style.display = 'none';
    copyConfigBtn.style.display = 'none';

    const controller = new AbortController();
    const signal = controller.signal;

    // Set a timeout for 10 seconds
    const timeoutId = setTimeout(() => {
      controller.abort(); // Abort the request after 10 seconds
    }, 10000);

    // Reset previous messages
    warningMessage.textContent = '';
    resultDiv.innerHTML = '';


    // return;


    document.getElementById('inputText').classList.remove('is-invalid');
    loadingSpinner.style.display = 'inline-block';

    // Disable the button during the request
    sendButton.disabled = true;

    // Perform the POST request using JavaScript or Axios
    // ...

    // Example using fetch:
    //32b1d1
    fetch('https://api.royalstore.top/V2Ray/V2RayUserTraffic/Read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        Url:
          (inputText.substring(0, 1) == 2) ?
            `http://panel.s${inputText.substring(5)}.soft98parspack.ir:8080/sub/${inputText.substring(1, 5)}`
            :
            `http://panel.vps${inputText.substring(5)}.soft98parspack.ir:8080/sub/${inputText.substring(1, 5)}`

      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        // ...

        // Example:
        if (data.IsSuccess) {
          // Decode base64 values
          const subscriptionUserinfo = data.Value.SubscriptionUserinfo;
          valueBody = atob(data.Value.Data);
          const decodedData = atob(data.Value.Data);

          // Split subscriptionUserinfo into parts
          const parts = subscriptionUserinfo.split(';');
          const uuidStartIndex = decodedData.indexOf('vless://') + 'vless://'.length;
          const uuidEndIndex = decodedData.indexOf('@', uuidStartIndex);
          uuid = uuidEndIndex !== -1 ? decodedData.substring(uuidStartIndex, uuidEndIndex) : '';

          // Extract additional info after '@' in decodedData
          const partsName = decodedData.split('_');
          const additionalInfoStartIndex = partsName[2];
          const additionalInfo = additionalInfoStartIndex;


          const upload = parseInt(parts[0].substring(7)) / (1024 * 1024);
          const download = parseInt(parts[1].substring(10)) / (1024 * 1024);
          const total = parseInt(parts[2].substring(7)) / (1024 * 1024);
          const expire = parseInt(parts[3].substring(8));

          let = expireConfig = '';

          if (expire !== 0) {
            const sentDate = new Date(expire * 1000);
            const difference = Math.floor((sentDate - Date.now()) / (1000 * 60 * 60 * 24));

            expireConfig = difference === 0
              ? 'how many hours left'
              : (difference > 0
                ? `روز مانده :${difference}`
                : `روز گذشته :${Math.abs(difference)}`);
          } else {
            expireConfig = 'unlimited';
          }

          const totalUsed = download + upload;
          let downloadConfig = '';

          if (totalUsed !== 0) {
            downloadConfig = totalUsed >= 1024
              ? `${(totalUsed / 1024).toFixed(2)} GB`
              : `${totalUsed.toFixed(2)} MB`;
          } else {
            downloadConfig = '0 MB';
          }


          let totalConfig = '';

          if (total !== 0) {
            totalConfig = total >= 1024
              ? `${(total / 1024).toFixed(2)} GB`
              : `${total.toFixed(2)} MB`;
          } else {
            totalConfig = 'unlimited';
          }

          decodedString = decodeURIComponent(additionalInfo);

          resultDiv.innerHTML = `
                            <div class="result-columns">
                                <div class="result-column p-3 bg-info bg-opacity-10 border border-info rounded-end">نام کانفیگ : ${decodedString}</div>
                                <div class="result-column p-3 bg-info bg-opacity-10 border border-info rounded-end">حجم استفاده شده : ${downloadConfig}</div>
                                <div class="result-column p-3 bg-info bg-opacity-10 border border-info rounded-end">حجم خریداری شده : ${totalConfig}</div>
                                <div class="result-column p-3 bg-info bg-opacity-10 border border-info rounded-end">${expireConfig}</div>
                            </div>
                                `;



          copyConfigBtn.style.display = 'inline-block';
          learnBtnMenu1.style.display = 'inline-block';
          learnBtnMenu2.style.display = 'inline-block';
          learnBtnMenu3.style.display = 'inline-block';
          learnBtnMenu4.style.display = 'inline-block';

          copyConfig();
          userCode = null;


          // Now decodedString contains "terafik moradpour"
          // var additionalInfoConfig = document.write(decodedString);

          // Display the data in separate columns

          // Show a confirmation message
          // console.log('Copied to clipboard');


          // const Toast = Swal.mixin({
          //     toast: true,
          //     position: "top-end",
          //     showConfirmButton: false,
          //     timer: 3000,
          //     timerProgressBar: true,
          //     color: "green",
          //     didOpen: (toast) => {
          //         toast.onmouseenter = Swal.stopTimer;
          //         toast.onmouseleave = Swal.resumeTimer;
          //     }
          // });
          // Toast.fire({
          //     icon: "success",
          //     title: "Copied to clipboard",
          // });
        } else {
          // Handle unsuccessful response
          console.error('Unsuccessful response:', data.Message);
          alert('مشکل اتصال');
        }
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        alert('Error: ' + error.message);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        // Enable the button after the request is complete
        sendButton.disabled = false;

        // Hide the loading spinner
        loadingSpinner.style.display = 'none';
        userCode = null;
      });




  }


}

function removeSpace(text) {
  if (text.includes(" ")) {
    console.log("فاصله در متن وجود دارد.");
    let newText = text.replace(/\s/g, ''); // حذف فاصله
    console.log("متن بدون فاصله: ", newText);
    return newText;
  } else {
    console.log("متن فاصله ندارد.");
    return text;
  }
}

//const copyConfigClipboard = document.getElementById('copyConfigBtn').dataset.uuid;


const copyConfig = async () => {

  const diamondConfig =
  {
    "dns": {
      "hosts": {
        "geosite:category-ads-all": "127.0.0.1",
        "domain:googleapis.cn": "googleapis.com",
        "dns.alidns.com": [
          "223.5.5.5",
          "223.6.6.6",
          "2400:3200::1",
          "2400:3200:baba::1"
        ],
        "one.one.one.one": [
          "1.1.1.1",
          "1.0.0.1",
          "2606:4700:4700::1111",
          "2606:4700:4700::1001"
        ],
        "dot.pub": [
          "1.12.12.12",
          "120.53.53.53"
        ],
        "dns.google": [
          "8.8.8.8",
          "8.8.4.4",
          "2001:4860:4860::8888",
          "2001:4860:4860::8844"
        ],
        "dns.quad9.net": [
          "9.9.9.9",
          "149.112.112.112",
          "2620:fe::fe",
          "2620:fe::9"
        ],
        "common.dot.dns.yandex.net": [
          "77.88.8.8",
          "77.88.8.1",
          "2a02:6b8::feed:0ff",
          "2a02:6b8:0:1::feed:0ff"
        ]
      },
      "servers": [
        "1.1.1.1",
        {
          "address": "1.1.1.1",
          "domains": [
            "domain:googleapis.cn",
            "domain:gstatic.com"
          ]
        },
        {
          "address": "223.5.5.5",
          "domains": [
            "domain:alidns.com",
            "domain:doh.pub",
            "domain:dot.pub",
            "domain:360.cn",
            "domain:onedns.net",
            "geosite:cn"
          ],
          "expectIPs": [
            "geoip:cn"
          ],
          "skipFallback": true
        }
      ]
    },
    "inbounds": [
      {
        "listen": "127.0.0.1",
        "port": 10808,
        "protocol": "socks",
        "settings": {
          "auth": "noauth",
          "udp": true,
          "userLevel": 8
        },
        "sniffing": {
          "destOverride": [
            "http",
            "tls"
          ],
          "enabled": true,
          "routeOnly": false
        },
        "tag": "socks"
      }
    ],
    "log": {
      "loglevel": "warning"
    },
    "outbounds": [
      {
        "mux": {
          "concurrency": 8,
          "enabled": true,
          "xudpConcurrency": 8,
          "xudpProxyUDP443": "reject"
        },
        "protocol": "vless",
        "settings": {
          "vnext": [
            {
              "address": `irancell.vps${inputText.substring(5)}.soft98parspack.ir`,
              "port": 2082,
              "users": [
                {
                  "encryption": "none",
                  "flow": "",
                  "id": uuid,
                  "level": 8
                }
              ]
            }
          ]
        },
        "streamSettings": {
          "network": "ws",
          "wsSettings": {
            "headers": {
              "Host": "zula.ir"
            },
            "path": "/?ed=1024"
          }
        },
        "tag": "proxy"
      },
      {
        "protocol": "freedom",
        "settings": {
          "domainStrategy": "UseIP"
        },
        "tag": "direct"
      },
      {
        "protocol": "blackhole",
        "settings": {
          "response": {
            "type": "http"
          }
        },
        "tag": "block"
      }
    ],
    "remarks": `ایرانسل 🟨 سرعت بالا ${decodedString.trim()} 🚀`,
    "routing": {
      "domainStrategy": "IPIfNonMatch",
      "rules": [
        {
          "ip": [
            "1.1.1.1"
          ],
          "outboundTag": "proxy",
          "port": "53",
          "type": "field"
        },
        {
          "ip": [
            "223.5.5.5"
          ],
          "outboundTag": "direct",
          "port": "53",
          "type": "field"
        },
        {
          "domain": [
            "domain:googleapis.cn",
            "domain:gstatic.com"
          ],
          "outboundTag": "proxy",
          "type": "field"
        },
        {
          "network": "udp",
          "outboundTag": "block",
          "port": "443",
          "type": "field"
        },
        {
          "domain": [
            "geosite:category-ads-all"
          ],
          "outboundTag": "block",
          "type": "field"
        },
        {
          "ip": [
            "geoip:private"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "domain": [
            "geosite:private"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "ip": [
            "223.5.5.5",
            "223.6.6.6",
            "2400:3200::1",
            "2400:3200:baba::1",
            "119.29.29.29",
            "1.12.12.12",
            "120.53.53.53",
            "2402:4e00::",
            "2402:4e00:1::",
            "180.76.76.76",
            "2400:da00::6666",
            "114.114.114.114",
            "114.114.115.115",
            "114.114.114.119",
            "114.114.115.119",
            "114.114.114.110",
            "114.114.115.110",
            "180.184.1.1",
            "180.184.2.2",
            "101.226.4.6",
            "218.30.118.6",
            "123.125.81.6",
            "140.207.198.6",
            "1.2.4.8",
            "210.2.4.8",
            "52.80.66.66",
            "117.50.22.22",
            "2400:7fc0:849e:200::4",
            "2404:c2c0:85d8:901::4",
            "117.50.10.10",
            "52.80.52.52",
            "2400:7fc0:849e:200::8",
            "2404:c2c0:85d8:901::8",
            "117.50.60.30",
            "52.80.60.30"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "domain": [
            "domain:alidns.com",
            "domain:doh.pub",
            "domain:dot.pub",
            "domain:360.cn",
            "domain:onedns.net"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "ip": [
            "geoip:cn"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "domain": [
            "geosite:cn"
          ],
          "outboundTag": "direct",
          "type": "field"
        }
      ]
    }
  };

  const royalConfig = {
    "remarks": `همراه اول 🟦 ایرانسل 🟨 سرعت بالا  ${decodedString.trim()} 🚀`,
    "log": {
      "access": "",
      "error": "",
      "loglevel": "warning"
    },
    "inbounds": [
      {
        "tag": "socks",
        "port": 10808,
        "listen": "127.0.0.1",
        "protocol": "socks",
        "sniffing": {
          "enabled": true,
          "destOverride": [
            "http",
            "tls"
          ],
          "routeOnly": false
        },
        "settings": {
          "auth": "noauth",
          "udp": true,
          "allowTransparent": false
        }
      },
      {
        "tag": "http",
        "port": 10809,
        "listen": "127.0.0.1",
        "protocol": "http",
        "sniffing": {
          "enabled": true,
          "destOverride": [
            "http",
            "tls"
          ],
          "routeOnly": false
        },
        "settings": {
          "auth": "noauth",
          "udp": true,
          "allowTransparent": false
        }
      }
    ],
    "outbounds": [
      {
        "tag": "proxy",
        "protocol": "vless",
        "settings": {
          "vnext": [
            {
              "address": "zula.ir",
              "port": 2082,
              "users": [
                {
                  "id": uuid,
                  "alterId": 0,
                  "email": "t@t.tt",
                  "security": "auto",
                  "encryption": "none",
                  "flow": ""
                }
              ]
            }
          ]
        },
        "streamSettings": {
          "network": "ws",
          "wsSettings": {
            "path": "/",
            "headers": {
              "Host": `royal.vps${inputText.substring(5)}.WwW.DIgIKAla.Com.sOft98ParspaCK.Ir`
            }
          },
          "sockopt": {
            "dialerProxy": "fragment",
            "tcpKeepAliveIdle": 100,
            "mark": 255,
            "tcpNoDelay": true
          }
        },
        "mux": {
          "enabled": true,
          "concurrency": 8,
          "xudpConcurrency": 8,
          "xudpProxyUDP443": "reject"
        }
      },
      {
        "tag": "fragment",
        "protocol": "freedom",
        "settings": {
          "domainStrategy": "AsIs",
          "fragment": {
            "packets": "tlshello",
            "length": "1-2",
            "interval": "6-9"
          }
        },
        "streamSettings": {
          "sockopt": {
            "tcpNoDelay": true,
            "tcpKeepAliveIdle": 100
          }
        }
      },
      {
        "tag": "direct",
        "protocol": "freedom",
        "settings": {}
      },
      {
        "tag": "block",
        "protocol": "blackhole",
        "settings": {
          "response": {
            "type": "http"
          }
        }
      }
    ],
    "routing": {
      "domainStrategy": "AsIs",
      "rules": [
        {
          "type": "field",
          "inboundTag": [
            "api"
          ],
          "outboundTag": "api",
          "enabled": true
        },
        {
          "id": "5627785659655799759",
          "type": "field",
          "port": "0-65535",
          "outboundTag": "proxy",
          "enabled": true
        }
      ]
    }
  };

  const meliConfig = {
    "dns": {
      "hosts": {
        "geosite:category-ads-all": "127.0.0.1",
        "domain:googleapis.cn": "googleapis.com",
        "dns.alidns.com": [
          "223.5.5.5",
          "223.6.6.6",
          "2400:3200::1",
          "2400:3200:baba::1"
        ],
        "one.one.one.one": [
          "1.1.1.1",
          "1.0.0.1",
          "2606:4700:4700::1111",
          "2606:4700:4700::1001"
        ],
        "dot.pub": [
          "1.12.12.12",
          "120.53.53.53"
        ],
        "dns.google": [
          "8.8.8.8",
          "8.8.4.4",
          "2001:4860:4860::8888",
          "2001:4860:4860::8844"
        ],
        "dns.quad9.net": [
          "9.9.9.9",
          "149.112.112.112",
          "2620:fe::fe",
          "2620:fe::9"
        ],
        "common.dot.dns.yandex.net": [
          "77.88.8.8",
          "77.88.8.1",
          "2a02:6b8::feed:0ff",
          "2a02:6b8:0:1::feed:0ff"
        ]
      },
      "servers": [
        "1.1.1.1",
        {
          "address": "1.1.1.1",
          "domains": [
            "domain:googleapis.cn",
            "domain:gstatic.com"
          ]
        },
        {
          "address": "223.5.5.5",
          "domains": [
            "domain:alidns.com",
            "domain:doh.pub",
            "domain:dot.pub",
            "domain:360.cn",
            "domain:onedns.net",
            "geosite:cn"
          ],
          "expectIPs": [
            "geoip:cn"
          ],
          "skipFallback": true
        }
      ]
    },
    "inbounds": [
      {
        "listen": "127.0.0.1",
        "port": 10808,
        "protocol": "socks",
        "settings": {
          "auth": "noauth",
          "udp": true,
          "userLevel": 8
        },
        "sniffing": {
          "destOverride": [
            "http",
            "tls"
          ],
          "enabled": true,
          "routeOnly": false
        },
        "tag": "socks"
      }
    ],
    "log": {
      "loglevel": "warning"
    },
    "outbounds": [
      {
        "mux": {
          "concurrency": 8,
          "enabled": true,
          "xudpConcurrency": 8,
          "xudpProxyUDP443": "reject"
        },
        "protocol": "vless",
        "settings": {
          "vnext": [
            {
              "address": `meli.vps${inputText.substring(5)}.sOft98ParspaCK.Ir`,
              "port": 2082,
              "users": [
                {
                  "encryption": "none",
                  "flow": "",
                  "id": uuid,
                  "level": 8
                }
              ]
            }
          ]
        },
        "streamSettings": {
          "network": "ws",
          "wsSettings": {
            "headers": {
              "Host": "zula.ir"
            },
            "path": "/?ed=1024"
          }
        },
        "tag": "proxy"
      },
      {
        "protocol": "freedom",
        "settings": {
          "domainStrategy": "UseIP"
        },
        "tag": "direct"
      },
      {
        "protocol": "blackhole",
        "settings": {
          "response": {
            "type": "http"
          }
        },
        "tag": "block"
      }
    ],
    "remarks": `وای فای 🟪 همراه اول 🟦 ایرانسل 🟨 سرعت متوسط ${decodedString.trim()}`,
    "routing": {
      "domainStrategy": "IPIfNonMatch",
      "rules": [
        {
          "ip": [
            "1.1.1.1"
          ],
          "outboundTag": "proxy",
          "port": "53",
          "type": "field"
        },
        {
          "ip": [
            "223.5.5.5"
          ],
          "outboundTag": "direct",
          "port": "53",
          "type": "field"
        },
        {
          "domain": [
            "domain:googleapis.cn",
            "domain:gstatic.com"
          ],
          "outboundTag": "proxy",
          "type": "field"
        },
        {
          "network": "udp",
          "outboundTag": "block",
          "port": "443",
          "type": "field"
        },
        {
          "domain": [
            "geosite:category-ads-all"
          ],
          "outboundTag": "block",
          "type": "field"
        },
        {
          "ip": [
            "geoip:private"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "domain": [
            "geosite:private"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "ip": [
            "223.5.5.5",
            "223.6.6.6",
            "2400:3200::1",
            "2400:3200:baba::1",
            "119.29.29.29",
            "1.12.12.12",
            "120.53.53.53",
            "2402:4e00::",
            "2402:4e00:1::",
            "180.76.76.76",
            "2400:da00::6666",
            "114.114.114.114",
            "114.114.115.115",
            "114.114.114.119",
            "114.114.115.119",
            "114.114.114.110",
            "114.114.115.110",
            "180.184.1.1",
            "180.184.2.2",
            "101.226.4.6",
            "218.30.118.6",
            "123.125.81.6",
            "140.207.198.6",
            "1.2.4.8",
            "210.2.4.8",
            "52.80.66.66",
            "117.50.22.22",
            "2400:7fc0:849e:200::4",
            "2404:c2c0:85d8:901::4",
            "117.50.10.10",
            "52.80.52.52",
            "2400:7fc0:849e:200::8",
            "2404:c2c0:85d8:901::8",
            "117.50.60.30",
            "52.80.60.30"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "domain": [
            "domain:alidns.com",
            "domain:doh.pub",
            "domain:dot.pub",
            "domain:360.cn",
            "domain:onedns.net"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "ip": [
            "geoip:cn"
          ],
          "outboundTag": "direct",
          "type": "field"
        },
        {
          "domain": [
            "geosite:cn"
          ],
          "outboundTag": "direct",
          "type": "field"
        }
      ]
    }
  };


  const configJson =
    (inputText.substring(0, 1) != 2) ?
      [meliConfig, diamondConfig, royalConfig]

      : `vless://${uuid}@irancell.s${inputText.substring(5)}.soft98parspack.ir:8880?path=/soft98.ir-soft98.ir-irancell-irancell-soft98.ir-soft98.ir-irancell-irancell-soft98.ir-soft98.ir-irancell-irancell:8080&security=none&encryption=none&host=fast.com&type=ws#الماسی_🇩🇪${decodedString}🚀\nvless://${uuid}@www.speedtest.net:8880?path=/soft98.ir-soft98.ir-irancell-irancell-soft98.ir-soft98.ir-irancell-irancell-soft98.ir-soft98.ir-irancell-irancell:8080&security=none&encryption=none&host=royal.s${inputText.substring(5)}.github.com.parspack.site.%E5%88%97%E5%88%97%E7%94%B7%E4%BA%8B%E7%9A%84%E4%BA%8B%E5%88%97%E4%B8%8A%E8%B5%9B%E7%94%B7.soft98parspack.ir&type=ws# رویال_🇩🇪${decodedString}\nvless://${uuid}@arvan.s${inputText.substring(5)}.soft98parspack.ir:8880?path=/soft98.ir-soft98.ir-irancell-irancell-soft98.ir-soft98.ir-irancell-irancell-soft98.ir-soft98.ir-irancell-irancell:8080&security=none&encryption=none&host=fast.com&type=ws# ملی_🇮🇷🇩🇪${decodedString}`;



  console.log(configJson);
  console.log(valueBody);

  const textarea = document.createElement('textarea');
  // Set the value of the textarea to the JSON string
  (inputText.substring(0, 1) != 2) ? textarea.value = JSON.stringify(configJson) : textarea.value = configJson; // JSON.stringify(configJson)
  // Make the textarea hidden

  textarea.style.position = 'fixed';
  textarea.style.top = 0;
  textarea.style.left = 0;
  textarea.style.width = '1px';
  textarea.style.height = '1px';
  textarea.style.opacity = 0;

  // Append the textarea to the document
  document.body.appendChild(textarea);

  // Select the text inside the textarea
  textarea.select();
  // Execute the copy command
  document.execCommand('copy');

  // Remove the textarea from the document
  document.body.removeChild(textarea);

  // Show a confirmation message
  console.log('Copied to clipboard');
  // alert('Copied to clipboard');
  Toastify({
    text: "\n\n           در کلیبورد ذخیره شد          \n\n",
    duration: 3000,
    //destination: "https://github.com/apvarun/toastify-js",
    newWindow: false,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    // Callback after click
  }).showToast();
  // try {
  //     await navigator.clipboard.writeText(JSON.stringify(configJson));
  //     console.log(' copied to clipboard');
  //     alert('در کلیپ بورد ذخیره شد');
  // } catch (err) {
  //     console.error('Failed to copy: ', err);
  //     alert('مشکل در کد');
  // }
}
