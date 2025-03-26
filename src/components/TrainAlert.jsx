// import React from "react";

// const TrainAlert = ({ phoneNumber }) => {
//   // Browser Notification Function
//   const showTrainDelayNotification = () => {
//     if ("Notification" in window) {
//       Notification.requestPermission().then(permission => {
//         if (permission === "granted") {
//           new Notification("🚆 Train Delay Alert!", {
//             body: "Train No. 12345 is delayed by 30 mins. Check alternative routes!",
//             icon: "/train-icon.png",
//           });
//         }
//       });
//     }
//   };

//   // WhatsApp Alert Function
//   const sendWhatsAppAlert = () => {
//     const message = encodeURIComponent(
//       "🚆 Train No. 12345 is delayed by 30 mins. Check alternate trains now!"
//     );
//     const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
//     window.open(whatsappLink, "_blank");
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md bg-white">
//       <h2 className="text-lg font-bold text-gray-800">Train Delay Alerts</h2>
//       <button
//         onClick={showTrainDelayNotification}
//         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//       >
//         Show Browser Notification
//       </button>
//       <button
//         onClick={sendWhatsAppAlert}
//         className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//       >
//         Send WhatsApp Alert
//       </button>
//     </div>
//   );
// };

// export default TrainAlert;






import React from "react";

const TrainAlert = ({ phoneNumber }) => {
  // Browser Notification Function
  const showTrainDelayNotification = () => {
    console.log("🚆 Notification function triggered!"); // Debugging log

    if (!("Notification" in window)) {
      console.log("❌ Browser does not support notifications!");
      return;
    }

    Notification.requestPermission().then(permission => {
      console.log("🔔 Permission Status:", permission); // Debugging log

      if (permission === "granted") {
        setTimeout(() => {
          new Notification("🚆 Train Delay Alert!", {
            body: "Train No. 12345 is delayed by 30 mins. Check alternative routes!",
            icon: "/train-icon.png",
          });
          console.log("✅ Notification sent successfully!");
        }, 2000); // 2 सेकंद delay दिलाय
      } else {
        console.log("❌ Notification permission denied.");
        alert("Please allow notification permission in browser settings!");
      }
    }).catch(error => console.error("⚠️ Error requesting notification permission:", error));
  };

  // WhatsApp Alert Function
  const sendWhatsAppAlert = () => {
    if (!phoneNumber) {
      alert("Please provide a valid phone number!");
      return;
    }

    const message = encodeURIComponent(
      "🚆 Train No. 12345 is delayed by 30 mins. Check alternate trains now!"
    );
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    console.log("📲 Opening WhatsApp:", whatsappLink);
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold text-gray-800">Train Delay Alerts</h2>
      <button
        onClick={showTrainDelayNotification}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Show Browser Notification
      </button>
      <button
        onClick={sendWhatsAppAlert}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Send WhatsApp Alert
      </button>
    </div>
  );
};

export default TrainAlert;
