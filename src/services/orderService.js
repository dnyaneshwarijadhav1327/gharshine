/**
 * Order Service (Frontend Mock Layer)
 * 
 * TODO: Connect to backend checkout and tracking APIs (e.g. POST /api/orders, GET /api/orders/:id/track)
 */

export const orderService = {
  // Track order by ID and Phone
  async trackOrder(orderId, phone) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Normalize
    const cleanId = orderId?.trim().toUpperCase();
    
    // Return mock timeline
    return {
      success: true,
      data: {
        orderId: cleanId || "GS-89421",
        datePlaced: "October 04, 2026",
        estimatedDelivery: "October 08, 2026",
        shippingAddress: {
          name: "Amit Sharma",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560038"
        },
        courier: "BlueDart Express / Delhivery Surface",
        trackingNumber: "BD992817462IN",
        currentStatus: "Shipped", // Ordered, Confirmed, Packed, Shipped, Out for Delivery, Delivered
        steps: [
          { status: "Order Placed", date: "Oct 04, 11:20 AM", completed: true, desc: "Order details received & verified" },
          { status: "Order Confirmed", date: "Oct 04, 01:45 PM", completed: true, desc: "Payment confirmed, routed to fulfillment" },
          { status: "Packed & Sealed", date: "Oct 05, 10:15 AM", completed: true, desc: "Items packed with secure bubble wrap and leak-proof caps" },
          { status: "Shipped (In Transit)", date: "Oct 05, 06:30 PM", completed: true, desc: "Handed over to courier partner. In transit via express ground." },
          { status: "Out for Delivery", date: "Expected Oct 08", completed: false, desc: "Courier partner delivery executive assigned" },
          { status: "Delivered", date: "Expected Oct 08", completed: false, desc: "Package delivered to your doorstep" }
        ],
        items: [
          { name: "Glass & Ceramic Care & Protection Combo", qty: 1, price: 1599 },
          { name: "HydroBarrier Sofa & Fabric Spray", qty: 1, price: 999 }
        ],
        totalAmount: 2598
      }
    };
  },

  // Mock checkout initiation
  async createOrder(checkoutData) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      orderId: `GS-${Math.floor(10000 + Math.random() * 90000)}`,
      message: "Order placed successfully (Frontend Mock). Connect payment gateway API here."
    };
  }
};
