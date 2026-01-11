/* admin.js - Updated with Delete Functionality */

// 1. IMPORT FIREBASE (Added 'doc' and 'deleteDoc')
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, orderBy, query, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// 2. CONFIGURATION (PASTE YOUR KEYS HERE)
const firebaseConfig = {
  apiKey: "AIzaSyDMKRC8Fs4C11v5c4M-Slf52wUtA2RTZLw",
  authDomain: "beautiforia-store.firebaseapp.com",
  projectId: "beautiforia-store",
  storageBucket: "beautiforia-store.firebasestorage.app",
  messagingSenderId: "489069244876",
  appId: "1:489069244876:web:ed721861d649fe9b3f6d69"
};


// 3. INITIALIZE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. LOGIN FUNCTION
window.adminLogin = function() {
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (password === "1234") {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('dashboard-view').classList.remove('hidden');
        fetchOrders(); 
    } else {
        errorMsg.innerText = "Incorrect Password";
    }
};

// 5. FETCH ORDERS FUNCTION
window.fetchOrders = async function() {
    const container = document.getElementById('orders-container');
    container.innerHTML = '<p style="text-align:center;">Loading orders...</p>';

    try {
        // Sort by date (newest first) requires an Index in Firebase, 
        // but for now, we just get them all.
        const q = query(collection(db, "orders")); 
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            container.innerHTML = '<p style="text-align:center; padding:20px;">No orders found.</p>';
            return;
        }

        let html = '';
        
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const date = data.createdAt ? new Date(data.createdAt).toLocaleString() : 'Date Unknown';
            
            const itemsHtml = data.items.map(item => `
                <tr>
                    <td>${item.name} <br><small style="color:#888">${item.size}</small></td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity * item.price}</td>
                </tr>
            `).join('');

            html += `
                <div class="order-card" id="card-${docSnap.id}">
                    <div class="meta-row">
                        <span><strong>Order ID:</strong> ${docSnap.id}</span>
                        <span>${date}</span>
                    </div>
                    
                    <div class="customer-info">
                        <strong>${data.customer.name}</strong>
                        <div style="margin-top:5px;">
                            Phone: ${data.customer.phone}<br>
                            Address: ${data.customer.gov}, ${data.customer.address}
                        </div>
                    </div>

                    <table class="order-table">
                        <thead>
                            <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
                        </thead>
                        <tbody>${itemsHtml}</tbody>
                    </table>

                    <div class="total-row">Total: EGP ${data.total}</div>
                    
                    <div style="margin-top:15px; overflow:hidden;">
                        <span style="background:#e8f5e9; color:green; padding:5px 10px; border-radius:4px; font-size:0.8rem;">
                            ${data.status || 'New Order'}
                        </span>
                        
                        <button class="btn-delete" onclick="deleteOrder('${docSnap.id}')">
                            Delete Order
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `<p style="color:red; text-align:center;">Error loading data: ${error.message}</p>`;
    }
};

// 6. NEW DELETE FUNCTION
window.deleteOrder = async function(orderId) {
    // 1. Confirm with the user
    if (!confirm("Are you sure you want to permanently delete this order?")) {
        return;
    }

    try {
        // 2. Delete from Firebase
        await deleteDoc(doc(db, "orders", orderId));
        
        // 3. Remove from screen immediately (looks faster)
        const card = document.getElementById(`card-${orderId}`);
        if(card) card.style.display = 'none';

        alert("Order deleted successfully.");
        
    } catch (error) {
        console.error("Error deleting:", error);
        alert("Failed to delete order. Check console for details.");
    }
};

window.logout = function() {
    window.location.href = "index.html";
};