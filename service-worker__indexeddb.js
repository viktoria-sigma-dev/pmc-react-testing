const DB_NAME = 'my-database';
const DB_STORE_NAME = 'preferences';
let attachDNSFlag = 'false';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(DB_STORE_NAME, { keyPath: 'key' });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

function setValue(key, value) {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(DB_STORE_NAME);
      store.put({ key, value });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
}

// Function to get a value from IndexedDB
function getValue(key) {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_STORE_NAME], 'readonly');
      const store = transaction.objectStore(DB_STORE_NAME);
      const request = store.get(key);

      request.onsuccess = (event) => {
        resolve(event.target.result?.value);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
}

function initializeFlag() {
  return getValue('attachDNSFlag')
    .then(flag => {
      if (flag !== undefined) {
        attachDNSFlag = flag;
      }
    })
    .catch(error => {
      console.error('Error initializing attachDNSFlag from IndexedDB:', error);
    });
}

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  event.waitUntil(
    initializeFlag().then(() => {
      self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (attachDNSFlag === 'true' ? (() => {
      const modifiedRequest = new Request(event.request, {
        headers: new Headers({
          ...Object.fromEntries(event.request.headers.entries()),
          'X-User-IndexedDB-DNS': 1
        })
      });
      return fetch(modifiedRequest);
    })() : fetch(event.request))
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SET_ATTACH_DNS') {
    console.log(`Service Worker received message: attachDNSFlag set to ${event.data.value}`);
    attachDNSFlag = event.data.value;
    setValue('attachDNSFlag', event.data.value);
  }
});
